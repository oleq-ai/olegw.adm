# --------------------------------------------
# Multi-frontend Makefile (mulabet, haraka, betmoto)
# Usage examples:
#   make deploy-all BRANCH=main REBUILD=1 NO_CACHE=0
#   make deploy APPS="mulabet haraka" BRANCH=main REBUILD=1
#   make restart-betmoto REBUILD=1
# --------------------------------------------

# -------- Config --------
BRANCH   ?= main
REBUILD  ?= 0        # 1 = rebuild images before up
NO_CACHE ?= 0        # 1 = --no-cache on build
BUILD_FLAGS := $(if $(filter 1,$(NO_CACHE)),--no-cache,)

COMPOSE_MULABET  = docker compose -f docker/mulabet/compose.yaml
COMPOSE_HARAKA   = docker compose -f docker/haraka/compose.yaml
COMPOSE_BETMOTO  = docker compose -f docker/betmoto/compose.yaml

# If you ever split services per stack, list them here and swap "up -d" with "up -d --no-deps <svc>" loop.
# SERVICES_MULABET   =
# SERVICES_HARAKA    =
# SERVICES_BETMOTO   =

# -------- Utilities --------
.PHONY: help
help: ## Show help (grouped)
	@echo "Available commands:"
	@grep -E '(^[a-zA-Z0-9_-]+:.*?## .*$$)|(^##@)' $(MAKEFILE_LIST) \
	| awk 'BEGIN {FS = ":.*?## "}; \
	/^##@/ {printf "\n\033[1m%s\033[0m\n", substr($$0,5)} \
	/^[a-zA-Z0-9_-]+:/ {printf "  \033[36m%-22s\033[0m %s\n", $$1, $$2}'

.PHONY: update-code
update-code: ## Fetch/checkout/pull the repo once
	@git fetch --all --prune
	@git checkout $(BRANCH)
	@git pull --ff-only origin $(BRANCH)

# -------- Mulabet --------
##@ Mulabet
.PHONY: build-mulabet
build-mulabet: ## Build mulabet image(s)
	$(COMPOSE_MULABET) build $(BUILD_FLAGS)

.PHONY: start-mulabet
start-mulabet: ## Start mulabet (no hard stop)
	$(COMPOSE_MULABET) up -d

.PHONY: stop-mulabet
stop-mulabet: ## HARD stop mulabet (avoid in prod)
	$(COMPOSE_MULABET) down

.PHONY: restart-mulabet
restart-mulabet: ## Rolling restart mulabet (REBUILD=1 to build first)
ifeq ($(REBUILD),1)
	$(MAKE) build-mulabet NO_CACHE=$(NO_CACHE)
endif
	$(COMPOSE_MULABET) up -d

.PHONY: deploy-mulabet
deploy-mulabet: update-code ## Pull once, then deploy mulabet
	$(MAKE) restart-mulabet REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)

# -------- Haraka --------
##@ Haraka
.PHONY: build-haraka
build-haraka: ## Build haraka image(s)
	$(COMPOSE_HARAKA) build $(BUILD_FLAGS)

.PHONY: start-haraka
start-haraka: ## Start haraka (no hard stop)
	$(COMPOSE_HARAKA) up -d

.PHONY: stop-haraka
stop-haraka: ## HARD stop haraka (avoid in prod)
	$(COMPOSE_HARAKA) down

.PHONY: restart-haraka
restart-haraka: ## Rolling restart haraka (REBUILD=1 to build first)
ifeq ($(REBUILD),1)
	$(MAKE) build-haraka NO_CACHE=$(NO_CACHE)
endif
	$(COMPOSE_HARAKA) up -d

.PHONY: deploy-haraka
deploy-haraka: update-code ## Pull once, then deploy haraka
	$(MAKE) restart-haraka REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)

# -------- Betmoto --------
##@ Betmoto
.PHONY: build-betmoto
build-betmoto: ## Build betmoto image(s)
	$(COMPOSE_BETMOTO) build $(BUILD_FLAGS)

.PHONY: start-betmoto
start-betmoto: ## Start betmoto (no hard stop)
	$(COMPOSE_BETMOTO) up -d

.PHONY: stop-betmoto
stop-betmoto: ## HARD stop betmoto (avoid in prod)
	$(COMPOSE_BETMOTO) down

.PHONY: restart-betmoto
restart-betmoto: ## Rolling restart betmoto (REBUILD=1 to build first)
ifeq ($(REBUILD),1)
	$(MAKE) build-betmoto NO_CACHE=$(NO_CACHE)
endif
	$(COMPOSE_BETMOTO) up -d

.PHONY: deploy-betmoto
deploy-betmoto: update-code ## Pull once, then deploy betmoto
	$(MAKE) restart-betmoto REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)

# -------- Global --------
##@ Global
.PHONY: build-all
build-all: ## Build all images
	$(MAKE) build-mulabet NO_CACHE=$(NO_CACHE)
	$(MAKE) build-haraka  NO_CACHE=$(NO_CACHE)
	$(MAKE) build-betmoto NO_CACHE=$(NO_CACHE)

.PHONY: start-all
start-all: ## Start all stacks
	$(MAKE) start-mulabet
	$(MAKE) start-haraka
	$(MAKE) start-betmoto

.PHONY: stop-all
stop-all: ## HARD stop all (avoid in prod)
	$(MAKE) stop-mulabet
	$(MAKE) stop-haraka
	$(MAKE) stop-betmoto

.PHONY: restart-all
restart-all: ## Rolling restart all (REBUILD=1 to build first)
	$(MAKE) restart-mulabet REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)
	$(MAKE) restart-haraka  REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)
	$(MAKE) restart-betmoto REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)

.PHONY: deploy-all
deploy-all: update-code ## Pull once, then deploy all three
	$(MAKE) restart-mulabet REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)
	$(MAKE) restart-haraka  REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)
	$(MAKE) restart-betmoto REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE)

# Deploy a subset: make deploy APPS="mulabet haraka"
APPS ?=
.PHONY: deploy
deploy: update-code ## Pull once, then deploy subset: APPS="mulabet haraka betmoto"
	@for app in $(APPS); do \
	  echo ">> rolling $$app"; \
	  $(MAKE) restart-$$app REBUILD=$(REBUILD) NO_CACHE=$(NO_CACHE); \
	done

# --- Nginx helpers (host-installed Nginx via systemd) ---
# Auto-detect absolute paths (fallbacks keep CI predictable)
NGINX_BIN      ?= $(shell command -v nginx || echo /usr/sbin/nginx)
SYSTEMCTL_BIN  ?= $(shell command -v systemctl || echo /usr/bin/systemctl)

.PHONY: nginx-test
nginx-test: ## Validate nginx config (must be allowed in sudoers)
	@sudo -n $(NGINX_BIN) -t

.PHONY: nginx-reload
nginx-reload: nginx-test ## Validate then reload nginx (must be allowed in sudoers)
	@sudo -n $(SYSTEMCTL_BIN) reload nginx
	@echo "nginx reloaded"
