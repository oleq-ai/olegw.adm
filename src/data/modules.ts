export type ModuleItem = {
  id: string;
  name: string;
  children?: ModuleItem[];
};

const modulesData = [
  {
    id: "dashboard",
    name: "Dashboard",
    children: [{ id: "dashboard:view", name: "View Dashboard" }],
  },
  {
    id: "leaderboard",
    name: "Leader Board",
    children: [{ id: "leaderboard:view", name: "View Leaderboard" }],
  },
  {
    id: "influencertracking",
    name: "Influencer Tracking",
    children: [
      { id: "influencertracking:view", name: "View Influencer Tracking" },
    ],
  },
  {
    id: "betting",
    name: "Betting Management",
    children: [
      { id: "betting:manage", name: "Manage Bets" },
      { id: "betting:view", name: "View Bets" },
      { id: "betting:void", name: "Void Bets" },
      { id: "betting:adjust", name: "Adjust Bet Values" },
      { id: "betting:limits", name: "Set Betting Limits" },
      { id: "betting:validation", name: "Adjust Bet Validation Rules" },
    ],
  },
  {
    id: "players",
    name: "Players Management",
    children: [
      { id: "players:view", name: "View Players" },
      { id: "players:manage", name: "Manage Players" },
      { id: "players:config", name: "Config Players" },
    ],
  },
  {
    id: "games",
    name: "Game Management",
    children: [
      { id: "games:add", name: "Add New Game" },
      { id: "games:view", name: "View Games" },
      { id: "games:stats", name: "View Games Stats" },
    ],
  },
  {
    id: "events",
    name: "Events Management",
    children: [
      { id: "events:manage", name: "Manage Events" },
      { id: "events:view", name: "View Events" },
    ],
  },
  {
    id: "odds",
    name: "Odds Management",
    children: [
      { id: "odds:manage", name: "Manage Odds" },
      { id: "odds:view", name: "View Odds" },
    ],
  },
  {
    id: "promotions",
    name: "Promotions & Bonuses",
    children: [
      { id: "promotions:manage", name: "Manage Promotions" },
      { id: "promotions:view", name: "View Promotions" },
      { id: "bonuses:manage", name: "Manage Bonuses" },
      { id: "bonuses:view", name: "View Bonuses" },
    ],
  },
  {
    id: "risk",
    name: "Risk Management",
    children: [
      { id: "manage:risk-settings", name: "Manage Risk Settings" },
      { id: "view:risk-settings", name: "View Risk Settings" },
      { id: "view:risk-alerts", name: "View Risk Alerts" },
      { id: "manage:risk-mitigation", name: "Manage Risk Mitigation" },
    ],
  },
  {
    id: "compliance",
    name: "Compliance Monitoring",
    children: [
      { id: "view:compliance-aml", name: "View Anti-Money Laundering" },
      { id: "manage:compliance-aml", name: "Manage Anti-Money Laundering" },
      { id: "view:compliance-kyc", name: "View KYC Verification" },
      { id: "manage:compliance-kyc", name: "Manage KYC Verification" },
      { id: "view:compliance-responsible", name: "View Responsible Gambling" },
      {
        id: "manage:compliance-responsible",
        name: "Manage Responsible Gambling",
      },
    ],
  },
  {
    id: "transactions",
    name: "Transaction Management",
    children: [
      { id: "transactions:manage", name: "Manage Transactions" },
      { id: "transactions:view", name: "View Transactions" },
      { id: "transactions:deposits", name: "View Deposits" },
      { id: "transactions:withdrawals", name: "View Withdrawals" },
      { id: "transactions:stats", name: "View Transaction Stats" },
      { id: "transactions:retry", name: "Retry Failed Transactions" },
    ],
  },
  {
    id: "payments",
    name: "Payment Provider Management",
    children: [
      { id: "payments:manage", name: "Manage Payment Providers" },
      { id: "payments:view", name: "View Payment Providers" },
    ],
  },
  {
    id: "reports",
    name: "Reports",
    children: [{ id: "reports:view", name: "View Reports" }],
  },
  {
    id: "users",
    name: "User Management",
    children: [
      { id: "users:manage", name: "Manage Users" },
      { id: "users:view", name: "View Users" },
      { id: "users:stats", name: "View User Stats" },
    ],
  },
  {
    id: "roles",
    name: "Role Management",
    children: [
      { id: "roles:manage", name: "Manage Roles" },
      { id: "roles:view", name: "View Roles" },
    ],
  },
  {
    id: "settings",
    name: "Settings",
    children: [
      { id: "settings:view", name: "View Settings" },
      { id: "settings:manage", name: "Manage Settings" },
    ],
  },
] as const;

export type Permission =
  | (typeof modulesData)[number]["children"][number]["id"]
  | "*";

export const moduleItems: ModuleItem[] = modulesData.map((module) => ({
  id: module.id,
  name: module.name,
  children: module.children?.map((child) => ({
    id: child.id,
    name: child.name,
  })),
}));
