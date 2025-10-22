import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatAmount, formatNumber } from "@/lib/utils";

type Props = {
  bets: string;
  bettotal: string;
  won: string;
  betwinnings: string;
};

export default function BettingHistory({
  bets,
  bettotal,
  won,
  betwinnings,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Betting Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="mb-2 font-medium">Total Bets</h4>
            <div className="text-2xl font-bold">{formatNumber(bets)}</div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Total Amount Bet</h4>
            <div className="text-2xl font-bold">{formatAmount(bettotal)}</div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Wins</h4>
            <div className="text-2xl font-bold">{formatNumber(won)}</div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Win Rate</h4>
            <div className="text-2xl font-bold">
              {((parseInt(won) / parseInt(bets)) * 100).toFixed(2)}%
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Total Winnings</h4>
            <div className="text-2xl font-bold">
              {formatAmount(betwinnings)}
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Return on Investment</h4>
            <div className="text-2xl font-bold">
              {((parseInt(betwinnings) / parseInt(bettotal)) * 100).toFixed(2)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
