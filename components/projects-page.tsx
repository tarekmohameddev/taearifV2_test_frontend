"use client";

import { useState } from "react";
import {
  Building2,
  Calendar,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  MapPin,
  MoreHorizontal,
  Plus,
  Users,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([500000, 2000000]);

  const projects = [
    {
      id: "1",
      name: "Skyline Residences",
      location: "Downtown, New York",
      price: "From $750,000",
      status: "Pre-construction",
      completionDate: "2025",
      units: 120,
      developer: "Urban Development Group",
      description: "Luxury high-rise condominiums with panoramic city views",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: "2",
      name: "Riverside Gardens",
      location: "Riverside, Chicago",
      price: "From $550,000",
      status: "Under Construction",
      completionDate: "2024",
      units: 85,
      developer: "River Homes Inc.",
      description: "Modern townhomes with private gardens along the riverfront",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: "3",
      name: "The Oaks",
      location: "Westside, Los Angeles",
      price: "From $1,200,000",
      status: "Completed",
      completionDate: "2023",
      units: 45,
      developer: "Luxury Estates",
      description: "Exclusive gated community with custom-built luxury homes",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: "4",
      name: "Metro Heights",
      location: "Midtown, Atlanta",
      price: "From $450,000",
      status: "Under Construction",
      completionDate: "2024",
      units: 200,
      developer: "City Developers",
      description:
        "Mixed-use development with condos, retail, and office space",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: "5",
      name: "Coastal Villas",
      location: "Oceanfront, Miami",
      price: "From $1,800,000",
      status: "Pre-construction",
      completionDate: "2026",
      units: 30,
      developer: "Beachfront Properties",
      description:
        "Exclusive beachfront villas with private pools and beach access",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: "6",
      name: "Green Valley",
      location: "Suburbs, Seattle",
      price: "From $650,000",
      status: "Under Construction",
      completionDate: "2024",
      units: 75,
      developer: "Eco Homes",
      description:
        "Sustainable community with energy-efficient homes and green spaces",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <DashboardSidebar activeTab="projects" setActiveTab={() => {}} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Development Projects
                </h1>
                <p className="text-muted-foreground">
                  Browse our latest real estate development projects
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-muted" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-muted" : ""}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">List view</span>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Filter Projects</DialogTitle>
                      <DialogDescription>
                        Refine your search with specific criteria
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Location</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Any location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new-york">New York</SelectItem>
                            <SelectItem value="chicago">Chicago</SelectItem>
                            <SelectItem value="los-angeles">
                              Los Angeles
                            </SelectItem>
                            <SelectItem value="miami">Miami</SelectItem>
                            <SelectItem value="seattle">Seattle</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Any status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre-construction">
                              Pre-construction
                            </SelectItem>
                            <SelectItem value="under-construction">
                              Under Construction
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <Label>Price Range</Label>
                          <span className="text-sm text-muted-foreground">
                            ${priceRange[0].toLocaleString()} - $
                            {priceRange[1].toLocaleString()}
                          </span>
                        </div>
                        <Slider
                          defaultValue={priceRange}
                          max={5000000}
                          min={100000}
                          step={50000}
                          onValueChange={setPriceRange}
                          className="py-4"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Reset</Button>
                      <Button>Apply Filters</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="gap-1">
                      <Plus className="h-4 w-4" />
                      Add Project
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Project</DialogTitle>
                      <DialogDescription>
                        Enter the details for the new development project
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input id="name" placeholder="Skyline Residences" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" placeholder="Downtown, New York" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="price">Starting Price</Label>
                          <Input id="price" placeholder="750000" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="units">Number of Units</Label>
                          <Input id="units" placeholder="120" type="number" />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pre-construction">
                              Pre-construction
                            </SelectItem>
                            <SelectItem value="under-construction">
                              Under Construction
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Input
                          id="description"
                          placeholder="Luxury high-rise condominiums with panoramic city views"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Add Project</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All Projects</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="pre-construction">
                  Pre-construction
                </TabsTrigger>
                <TabsTrigger value="under-construction">
                  Under Construction
                </TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <ProjectListItem key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="featured" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter((project) => project.featured)
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter((project) => project.featured)
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="pre-construction" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter(
                        (project) => project.status === "Pre-construction",
                      )
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter(
                        (project) => project.status === "Pre-construction",
                      )
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="under-construction" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter(
                        (project) => project.status === "Under Construction",
                      )
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter(
                        (project) => project.status === "Under Construction",
                      )
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter((project) => project.status === "Completed")
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter((project) => project.status === "Completed")
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        {project.featured && (
          <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            Featured
          </div>
        )}
        <div
          className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium ${
            project.status === "Completed"
              ? "bg-green-500 text-white"
              : project.status === "Under Construction"
                ? "bg-amber-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {project.status}
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{project.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {project.location}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Mark as Featured</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="text-lg font-semibold">{project.price}</div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">Units</span>
            <span className="font-medium flex items-center gap-1">
              <Users className="h-3 w-3" /> {project.units}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Completion</span>
            <span className="font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {project.completionDate}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">Developer</span>
            <span className="font-medium flex items-center gap-1">
              <Building2 className="h-3 w-3" />{" "}
              {project.developer.split(" ")[0]}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          View Details
        </Button>
        <Button size="sm" className="w-full">
          Register Interest
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectListItem({ project }: { project: any }) {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-1/3 md:w-1/4">
          <div className="aspect-[16/9] sm:aspect-auto sm:h-full w-full overflow-hidden">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          </div>
          {project.featured && (
            <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              Featured
            </div>
          )}
          <div
            className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium ${
              project.status === "Completed"
                ? "bg-green-500 text-white"
                : project.status === "Under Construction"
                  ? "bg-amber-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            {project.status}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {project.location}
              </p>
            </div>
            <div className="text-lg font-semibold">{project.price}</div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-auto pt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{project.units} Units</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Completion: {project.completionDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{project.developer}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                View Details
              </Button>
              <Button size="sm">Register Interest</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
