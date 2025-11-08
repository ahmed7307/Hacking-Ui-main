import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { mockLeaderboard } from '@/lib/mockData';

export default function Leaderboard() {
  
  const getTrendIcon = (change: string) => {
    if (change === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (change === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
    if (rank === 2) return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    if (rank === 3) return "bg-orange-500/20 text-orange-500 border-orange-500/30";
    return "bg-muted text-muted-foreground";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="inline-block p-4 rounded-full bg-accent/50 border border-primary/30 mb-4">
                <Trophy className="w-12 h-12 text-primary" />
              </div>
              <h1 className="text-4xl font-bold">Global Leaderboard</h1>
              <p className="text-xl text-muted-foreground">
                Top hackers ranked by points and achievements
              </p>
            </div>
          </motion.div>

          {/* Top 3 Podium */}
          {mockLeaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid md:grid-cols-3 gap-6 mb-12"
            >
              {/* 2nd Place */}
              <div className="md:order-1 md:mt-8">
                <Card className="border-gray-400/30 hover-elevate transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <Badge className="bg-gray-400/20 text-gray-400 border-gray-400/30">
                      #2
                    </Badge>
                    <Avatar className="w-20 h-20 mx-auto border-4 border-gray-400/30">
                      <AvatarFallback className="bg-accent text-primary text-2xl">
                        {mockLeaderboard[1].username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{mockLeaderboard[1].username}</h3>
                      <p className="text-2xl font-bold text-primary mt-2">
                        {mockLeaderboard[1].xp.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">XP</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 1st Place */}
              <div className="md:order-2">
                <Card className="border-yellow-500/30 hover-elevate transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30 glow-primary">
                      #1
                    </Badge>
                    <Avatar className="w-24 h-24 mx-auto border-4 border-yellow-500/30 glow-primary">
                      <AvatarFallback className="bg-accent text-primary text-3xl">
                        {mockLeaderboard[0].username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Trophy className="w-6 h-6 text-yellow-500" />
                        <h3 className="font-bold text-xl">{mockLeaderboard[0].username}</h3>
                      </div>
                      <p className="text-3xl font-bold text-primary">
                        {mockLeaderboard[0].xp.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">XP</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 3rd Place */}
              <div className="md:order-3 md:mt-8">
                <Card className="border-orange-500/30 hover-elevate transition-all">
                  <CardContent className="p-6 text-center space-y-4">
                    <Badge className="bg-orange-500/20 text-orange-500 border-orange-500/30">
                      #3
                    </Badge>
                    <Avatar className="w-20 h-20 mx-auto border-4 border-orange-500/30">
                      <AvatarFallback className="bg-accent text-primary text-2xl">
                        {mockLeaderboard[2].username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-lg">{mockLeaderboard[2].username}</h3>
                      <p className="text-2xl font-bold text-primary mt-2">
                        {mockLeaderboard[2].xp.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">XP</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {/* Full Leaderboard Table */}
          {mockLeaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="border-primary/20">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border/50">
                        <tr className="text-left">
                          <th className="p-4 font-semibold text-muted-foreground">Rank</th>
                          <th className="p-4 font-semibold text-muted-foreground">Player</th>
                          <th className="p-4 font-semibold text-muted-foreground">XP</th>
                          <th className="p-4 font-semibold text-muted-foreground">Rooms</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockLeaderboard.map((entry, index) => (
                          <tr
                            key={entry.rank}
                            className="border-b border-border/50 last:border-0 hover-elevate transition-all"
                          >
                            <td className="p-4">
                              <Badge className={getRankBadge(entry.rank)}>
                                #{entry.rank}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <Avatar>
                                  <AvatarFallback className="bg-accent text-primary">
                                    {entry.username.substring(0, 2).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{entry.username}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className="font-bold text-primary">
                                {entry.xp.toLocaleString()}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="text-muted-foreground">{entry.completedRooms}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Your Rank */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card className="border-primary/20 bg-accent/20">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-accent text-primary">
                        HP
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">Your Rank</h3>
                      <p className="text-sm text-muted-foreground">HackerPro</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">#142</p>
                      <p className="text-xs text-muted-foreground">Rank</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">1,250</p>
                      <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">23</p>
                      <p className="text-xs text-muted-foreground">Rooms</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}