import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Filter, BarChart3, TrendingUp, AlertTriangle } from "lucide-react";
import heatmapImg from "@/assets/heatmap.png"; // <-- your exported heatmap image

const HeatMap = () => {
  const [selectedState, setSelectedState] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [timeRange, setTimeRange] = useState("30d");

  // Mock data for demonstration
  const complaintsData = [
    { state: "Delhi", count: 45, resolved: 32, category: "Service Delay" },
    { state: "Mumbai", count: 38, resolved: 29, category: "Corruption" },
    { state: "Bangalore", count: 33, resolved: 25, category: "Service Quality" },
    { state: "Chennai", count: 28, resolved: 22, category: "Technical Issue" },
    { state: "Kolkata", count: 24, resolved: 18, category: "Service Delay" },
    { state: "Hyderabad", count: 21, resolved: 16, category: "Corruption" },
    { state: "Pune", count: 18, resolved: 14, category: "Service Quality" },
    { state: "Jaipur", count: 15, resolved: 12, category: "Technical Issue" }
  ];

  const getIntensityColor = (count: number) => {
    if (count >= 40) return "bg-red-500";
    if (count >= 30) return "bg-orange-500";
    if (count >= 20) return "bg-yellow-500";
    if (count >= 10) return "bg-green-500";
    return "bg-gray-300";
  };

  const getResolutionRate = (resolved: number, total: number) => {
    return Math.round((resolved / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Complaint HeatMAP</h1>
          <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            Visualize complaint patterns and service efficiency across different regions
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filter Options
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* State filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">State/Region</label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All States</SelectItem>
                    <SelectItem value="delhi">Delhi</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="chennai">Chennai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Category filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Complaint Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="service-delay">Service Delay</SelectItem>
                    <SelectItem value="corruption">Corruption</SelectItem>
                    <SelectItem value="service-quality">Service Quality</SelectItem>
                    <SelectItem value="technical">Technical Issues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Time filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Time Range</label>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 3 months</SelectItem>
                    <SelectItem value="1y">Last year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Heat Map Visualization */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="w-5 h-5 mr-2" />
                  Regional Complaint Distribution
                </CardTitle>
                <CardDescription>
                  Visual representation of complaint intensity across regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Real Heatmap */}
                <img
                  src={heatmapImg}
                  alt="Complaint Heatmap"
                  className="rounded-lg shadow-lg w-full mb-6"
                />

                {/* Regional Data Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {complaintsData.map((item) => (
                    <div key={item.state} className="text-center p-3 border border-border rounded-lg">
                      <div className={`w-8 h-8 rounded-full mx-auto mb-2 ${getIntensityColor(item.count)}`}></div>
                      <div className="text-sm font-medium">{item.state}</div>
                      <div className="text-xs text-muted-foreground">{item.count} complaints</div>
                      <div className="text-xs text-green-600">
                        {getResolutionRate(item.resolved, item.count)}% resolved
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legend */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="text-sm font-medium mb-3">Intensity Legend</h4>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                      <span>Low (0-10)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Medium (11-20)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>High (21-30)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span>Very High (31-40)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Critical (40+)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Panel */}
          <div className="space-y-6">
            {/* Overall Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Overall Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Complaints</span>
                    <span className="text-2xl font-bold">242</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resolved</span>
                    <span className="text-2xl font-bold text-green-600">168</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">In Progress</span>
                    <span className="text-2xl font-bold text-yellow-600">51</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending</span>
                    <span className="text-2xl font-bold text-red-600">23</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">69% Resolution Rate</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Issues */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Top Issue Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Delay</span>
                    <Badge variant="destructive">89</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Corruption</span>
                    <Badge variant="destructive">67</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Service Quality</span>
                    <Badge variant="secondary">51</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Technical Issues</span>
                    <Badge variant="secondary">35</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trend Analysis
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatMap;