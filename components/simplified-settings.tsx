"use client";

import { useState } from "react";
import {
  Globe,
  User,
  Users,
  CreditCard,
  Zap,
  Settings,
  Info,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function SimplifiedSettings() {
  const [activeTab, setActiveTab] = useState("domains");
  const [setupProgress, setSetupProgress] = useState(40);

  // Sample data
  const domains = [
    {
      id: "1",
      name: "mywebsite.com",
      status: "active",
      primary: true,
      ssl: true,
      addedDate: "2023-10-15",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Website Settings
          </h1>
          <p className="text-muted-foreground">
            Configure your website and account preferences
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Progress value={setupProgress} className="w-[180px]" />
            <span className="text-sm text-muted-foreground">
              {setupProgress}% Complete
            </span>
          </div>
          <Button className="gap-1 w-full md:w-auto">Save Changes</Button>
        </div>
      </div>

      {/* Beginner tip */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6 pb-4">
          <div className="flex items-start gap-3">
            <div className="rounded-full bg-primary/20 p-2 mt-0.5">
              <Lightbulb className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-sm">New to Website Settings?</h3>
              <p className="text-sm text-muted-foreground mt-1">
                We recommend starting with connecting your domain and setting up
                your account. Need help? Click the "?" icon in the top right
                corner.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        defaultValue="domains"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
          <TabsTrigger value="domains" className="flex gap-1 items-center">
            <Globe className="h-4 w-4" />
            <span>Website Address</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex gap-1 items-center">
            <User className="h-4 w-4" />
            <span>Your Account</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex gap-1 items-center">
            <Users className="h-4 w-4" />
            <span>Team Members</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex gap-1 items-center">
            <CreditCard className="h-4 w-4" />
            <span>Billing</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex gap-1 items-center">
            <Zap className="h-4 w-4" />
            <span>Connections</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex gap-1 items-center">
            <Settings className="h-4 w-4" />
            <span>Advanced</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="domains">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Your Website Address
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[300px]">
                          <p>
                            A domain is your website's address (like
                            example.com). Connect your own domain to make your
                            website look professional.
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription>
                    Connect your own domain name to your website
                  </CardDescription>
                </div>
                <Button className="gap-1">Add Domain</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {domains.length === 0 ? (
                  <div className="rounded-lg border border-dashed p-8 text-center">
                    <Globe className="mx-auto h-10 w-10 text-muted-foreground/60" />
                    <h3 className="mt-2 text-lg font-medium">
                      No domains connected
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Add a custom domain to make your website more professional
                    </p>
                    <Button variant="outline" className="mt-4">
                      Add Your First Domain
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {domains.map((domain) => (
                      <div
                        key={domain.id}
                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border"
                      >
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-primary" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{domain.name}</span>
                              {domain.primary && (
                                <Badge variant="outline">Main Address</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                variant={
                                  domain.status === "active"
                                    ? "default"
                                    : "secondary"
                                }
                                className={
                                  domain.status === "pending"
                                    ? "bg-amber-500"
                                    : ""
                                }
                              >
                                {domain.status === "active" ? (
                                  <span className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3" />
                                    Active
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1">
                                    <AlertTriangle className="h-3 w-3" />
                                    Pending
                                  </span>
                                )}
                              </Badge>
                              {domain.ssl ? (
                                <Badge
                                  variant="outline"
                                  className="bg-green-500/10 text-green-500 border-green-500/20"
                                >
                                  <span className="flex items-center gap-1">
                                    <Lock className="h-3 w-3" />
                                    Secure
                                  </span>
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2 md:mt-0">
                          {domain.status === "pending" ? (
                            <Button>Verify Domain</Button>
                          ) : !domain.primary ? (
                            <Button variant="outline">Set as Main</Button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                <span>
                  Need help?{" "}
                  <Button variant="link" className="h-auto p-0">
                    Watch our domain setup video
                  </Button>
                </span>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Other tabs would go here */}
      </Tabs>
    </div>
  );
}
