"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  Plus,
  Save,
  Trash2,
  MoveUp,
  MoveDown,
  ExternalLink,
  LinkIcon,
  Menu,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DashboardHeader } from "@/components/dashboard-header";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MenuManagementPage() {
  const [isLoading, setIsLoading] = useState(false);

  // Menu items state
  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      label: "الرئيسية",
      url: "/",
      isExternal: false,
      isActive: true,
      order: 1,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 2,
      label: "من نحن",
      url: "/about",
      isExternal: false,
      isActive: true,
      order: 2,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 3,
      label: "خدماتنا",
      url: "/services",
      isExternal: false,
      isActive: true,
      order: 3,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 4,
      label: "المشاريع",
      url: "/projects",
      isExternal: false,
      isActive: true,
      order: 4,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 5,
      label: "المدونة",
      url: "/blog",
      isExternal: false,
      isActive: true,
      order: 5,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 6,
      label: "اتصل بنا",
      url: "/contact",
      isExternal: false,
      isActive: true,
      order: 6,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 7,
      label: "مشاريع سكنية",
      url: "/projects/residential",
      isExternal: false,
      isActive: true,
      order: 1,
      parentId: 4,
      showOnMobile: true,
      showOnDesktop: true,
    },
    {
      id: 8,
      label: "مشاريع تجارية",
      url: "/projects/commercial",
      isExternal: false,
      isActive: true,
      order: 2,
      parentId: 4,
      showOnMobile: true,
      showOnDesktop: true,
    },
  ]);

  // New menu item state
  const [newMenuItem, setNewMenuItem] = useState({
    label: "",
    url: "",
    isExternal: false,
    isActive: true,
    parentId: null,
    showOnMobile: true,
    showOnDesktop: true,
  });

  // Edit menu item state
  const [editingItem, setEditingItem] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  // Get top-level menu items
  const topLevelItems = menuItems
    .filter((item) => item.parentId === null)
    .sort((a, b) => a.order - b.order);

  // Get child items for a parent
  const getChildItems = (parentId) => {
    return menuItems
      .filter((item) => item.parentId === parentId)
      .sort((a, b) => a.order - b.order);
  };

  // Add new menu item
  const handleAddMenuItem = () => {
    if (newMenuItem.label.trim() === "" || newMenuItem.url.trim() === "")
      return;

    const newItem = {
      ...newMenuItem,
      id: Date.now(),
      order: topLevelItems.length + 1,
    };

    setMenuItems([...menuItems, newItem]);

    // Reset form
    setNewMenuItem({
      label: "",
      url: "",
      isExternal: false,
      isActive: true,
      parentId: null,
      showOnMobile: true,
      showOnDesktop: true,
    });
  };

  // Remove menu item
  const handleRemoveMenuItem = (id) => {
    // Check if item has children
    const hasChildren = menuItems.some((item) => item.parentId === id);

    if (hasChildren) {
      alert(
        "لا يمكن حذف هذا العنصر لأنه يحتوي على عناصر فرعية. يرجى حذف العناصر الفرعية أولاً.",
      );
      return;
    }

    setMenuItems(menuItems.filter((item) => item.id !== id));
  };

  // Move item up in order
  const handleMoveItemUp = (id) => {
    const item = menuItems.find((item) => item.id === id);
    const itemsInSameLevel = menuItems
      .filter((i) => i.parentId === item.parentId)
      .sort((a, b) => a.order - b.order);
    const index = itemsInSameLevel.findIndex((i) => i.id === id);

    if (index <= 0) return;

    const updatedItems = [...menuItems];
    const currentItem = updatedItems.find((i) => i.id === id);
    const prevItem = updatedItems.find(
      (i) => i.id === itemsInSameLevel[index - 1].id,
    );

    // Swap orders
    const tempOrder = currentItem.order;
    currentItem.order = prevItem.order;
    prevItem.order = tempOrder;

    setMenuItems(updatedItems);
  };

  // Move item down in order
  const handleMoveItemDown = (id) => {
    const item = menuItems.find((item) => item.id === id);
    const itemsInSameLevel = menuItems
      .filter((i) => i.parentId === item.parentId)
      .sort((a, b) => a.order - b.order);
    const index = itemsInSameLevel.findIndex((i) => i.id === id);

    if (index >= itemsInSameLevel.length - 1) return;

    const updatedItems = [...menuItems];
    const currentItem = updatedItems.find((i) => i.id === id);
    const nextItem = updatedItems.find(
      (i) => i.id === itemsInSameLevel[index + 1].id,
    );

    // Swap orders
    const tempOrder = currentItem.order;
    currentItem.order = nextItem.order;
    nextItem.order = tempOrder;

    setMenuItems(updatedItems);
  };

  // Toggle item active status
  const handleToggleActive = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      ),
    );
  };

  // Toggle mobile visibility
  const handleToggleMobile = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, showOnMobile: !item.showOnMobile } : item,
      ),
    );
  };

  // Toggle desktop visibility
  const handleToggleDesktop = (id) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, showOnDesktop: !item.showOnDesktop } : item,
      ),
    );
  };

  // Open edit dialog
  const handleEditItem = (item) => {
    setEditingItem({ ...item });
    setIsEditDialogOpen(true);
  };

  // Save edited item
  const handleSaveEdit = () => {
    if (!editingItem) return;

    setMenuItems(
      menuItems.map((item) =>
        item.id === editingItem.id ? editingItem : item,
      ),
    );

    setIsEditDialogOpen(false);
    setEditingItem(null);
  };

  // Save all changes
  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("تم حفظ قائمة التنقل بنجاح!");
    }, 1000);
  };

  // Render menu item with its children
  const renderMenuItem = (item) => {
    const children = getChildItems(item.id);

    return (
      <div key={item.id} className="border rounded-lg mb-3">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center">
                <span
                  className={`font-medium ${!item.isActive ? "text-muted-foreground" : ""}`}
                >
                  {item.label}
                </span>
                {item.isExternal && (
                  <ExternalLink className="h-3 w-3 mr-1 text-muted-foreground" />
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center">
                <LinkIcon className="h-3 w-3 ml-1" />
                {item.url}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end mr-4">
                <div className="flex items-center mb-1">
                  <span className="text-xs ml-2">نشط</span>
                  <Switch
                    checked={item.isActive}
                    onCheckedChange={() => handleToggleActive(item.id)}
                    size="sm"
                  />
                </div>
                <div className="flex gap-2">
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${item.showOnMobile ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    جوال
                  </span>
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${item.showOnDesktop ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                  >
                    سطح المكتب
                  </span>
                </div>
              </div>

              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveItemUp(item.id)}
                  className="h-8 w-8"
                >
                  <MoveUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleMoveItemDown(item.id)}
                  className="h-8 w-8"
                >
                  <MoveDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEditItem(item)}
                  className="h-8 w-8"
                >
                  <Menu className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveMenuItem(item.id)}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {children.length > 0 && (
          <div className="border-t px-4 py-2 bg-muted/20">
            <div className="text-xs font-medium mb-2">العناصر الفرعية:</div>
            <div className="pr-4 border-r-2 border-muted">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="border rounded-lg mb-2 bg-background"
                >
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span
                            className={`font-medium ${!child.isActive ? "text-muted-foreground" : ""}`}
                          >
                            {child.label}
                          </span>
                          {child.isExternal && (
                            <ExternalLink className="h-3 w-3 mr-1 text-muted-foreground" />
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1 flex items-center">
                          <LinkIcon className="h-3 w-3 ml-1" />
                          {child.url}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end mr-4">
                          <div className="flex items-center mb-1">
                            <span className="text-xs ml-2">نشط</span>
                            <Switch
                              checked={child.isActive}
                              onCheckedChange={() =>
                                handleToggleActive(child.id)
                              }
                              size="sm"
                            />
                          </div>
                          <div className="flex gap-2">
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${child.showOnMobile ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              جوال
                            </span>
                            <span
                              className={`text-xs px-1.5 py-0.5 rounded ${child.showOnDesktop ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}
                            >
                              سطح المكتب
                            </span>
                          </div>
                        </div>

                        <div className="flex">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveItemUp(child.id)}
                            className="h-8 w-8"
                          >
                            <MoveUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleMoveItemDown(child.id)}
                            className="h-8 w-8"
                          >
                            <MoveDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEditItem(child)}
                            className="h-8 w-8"
                          >
                            <Menu className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => handleRemoveMenuItem(child.id)}
                            className="h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <EnhancedSidebar activeTab="content" />
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/content">
                <Button variant="outline" size="icon" className="h-8 w-8 mr-2">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">إدارة قائمة التنقل</h1>
                <p className="text-muted-foreground">
                  تخصيص روابط التنقل في موقعك
                </p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-1">جاري الحفظ...</span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save className="h-4 w-4 ml-1" />
                  حفظ التغييرات
                </span>
              )}
            </Button>
          </div>

          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="menu">قائمة التنقل</TabsTrigger>
              <TabsTrigger value="settings">إعدادات القائمة</TabsTrigger>
            </TabsList>

            <TabsContent value="menu" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إضافة عنصر جديد للقائمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="item-label">عنوان الرابط</Label>
                        <Input
                          id="item-label"
                          placeholder="مثال: من نحن"
                          value={newMenuItem.label}
                          onChange={(e) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              label: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-url">الرابط</Label>
                        <Input
                          id="item-url"
                          placeholder="مثال: /about"
                          value={newMenuItem.url}
                          onChange={(e) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              url: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="item-parent">
                          العنصر الأب (اختياري)
                        </Label>
                        <Select
                          value={
                            newMenuItem.parentId
                              ? newMenuItem.parentId.toString()
                              : "none"
                          }
                          onValueChange={(value) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              parentId:
                                value !== "none"
                                  ? Number.parseInt(value)
                                  : null,
                            })
                          }
                        >
                          <SelectTrigger id="item-parent">
                            <SelectValue placeholder="اختر العنصر الأب" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">بدون عنصر أب</SelectItem>
                            {topLevelItems.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="item-external">رابط خارجي</Label>
                        <Switch
                          id="item-external"
                          checked={newMenuItem.isExternal}
                          onCheckedChange={(checked) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              isExternal: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="item-active">نشط</Label>
                        <Switch
                          id="item-active"
                          checked={newMenuItem.isActive}
                          onCheckedChange={(checked) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              isActive: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="item-mobile">إظهار على الجوال</Label>
                        <Switch
                          id="item-mobile"
                          checked={newMenuItem.showOnMobile}
                          onCheckedChange={(checked) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              showOnMobile: checked,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="item-desktop">
                          إظهار على سطح المكتب
                        </Label>
                        <Switch
                          id="item-desktop"
                          checked={newMenuItem.showOnDesktop}
                          onCheckedChange={(checked) =>
                            setNewMenuItem({
                              ...newMenuItem,
                              showOnDesktop: checked,
                            })
                          }
                        />
                      </div>

                      <Button
                        onClick={handleAddMenuItem}
                        className="w-full mt-6"
                      >
                        <Plus className="h-4 w-4 ml-1" /> إضافة عنصر للقائمة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>عناصر القائمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {topLevelItems.map(renderMenuItem)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>إعدادات القائمة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="menu-position">موضع القائمة</Label>
                        <Select defaultValue="top">
                          <SelectTrigger id="menu-position">
                            <SelectValue placeholder="اختر موضع القائمة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="top">أعلى الصفحة</SelectItem>
                            <SelectItem value="left">يسار الصفحة</SelectItem>
                            <SelectItem value="right">يمين الصفحة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="menu-style">نمط القائمة</Label>
                        <Select defaultValue="standard">
                          <SelectTrigger id="menu-style">
                            <SelectValue placeholder="اختر نمط القائمة" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">قياسي</SelectItem>
                            <SelectItem value="buttons">أزرار</SelectItem>
                            <SelectItem value="underline">خط تحتي</SelectItem>
                            <SelectItem value="minimal">بسيط</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="mobile-menu-type">
                          نوع قائمة الجوال
                        </Label>
                        <Select defaultValue="hamburger">
                          <SelectTrigger id="mobile-menu-type">
                            <SelectValue placeholder="اختر نوع قائمة الجوال" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hamburger">
                              قائمة همبرغر
                            </SelectItem>
                            <SelectItem value="dropdown">
                              قائمة منسدلة
                            </SelectItem>
                            <SelectItem value="fullscreen">
                              ملء الشاشة
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sticky-menu">
                          قائمة ثابتة عند التمرير
                        </Label>
                        <Switch id="sticky-menu" defaultChecked={true} />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="transparent-menu">قائمة شفافة</Label>
                        <Switch id="transparent-menu" defaultChecked={false} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>نصائح لتحسين قائمة التنقل</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pr-5 space-y-2 text-sm">
                    <li>استخدم عناوين واضحة وموجزة للروابط</li>
                    <li>حافظ على عدد العناصر الرئيسية بين 5-7 عناصر</li>
                    <li>رتب العناصر حسب الأهمية من اليمين إلى اليسار</li>
                    <li>استخدم القوائم المنسدلة فقط عند الضرورة</li>
                    <li>
                      تأكد من أن القائمة تعمل بشكل جيد على جميع أحجام الشاشات
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل عنصر القائمة</DialogTitle>
            <DialogDescription>
              قم بتعديل خصائص عنصر القائمة هنا. اضغط حفظ عند الانتهاء.
            </DialogDescription>
          </DialogHeader>

          {editingItem && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-label">عنوان الرابط</Label>
                <Input
                  id="edit-label"
                  value={editingItem.label}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, label: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-url">الرابط</Label>
                <Input
                  id="edit-url"
                  value={editingItem.url}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, url: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-parent">العنصر الأب</Label>
                <Select
                  value={
                    editingItem.parentId
                      ? editingItem.parentId.toString()
                      : "none"
                  }
                  onValueChange={(value) =>
                    setEditingItem({
                      ...editingItem,
                      parentId:
                        value !== "none" ? Number.parseInt(value) : null,
                    })
                  }
                  disabled={getChildItems(editingItem.id).length > 0}
                >
                  <SelectTrigger id="edit-parent">
                    <SelectValue placeholder="اختر العنصر الأب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">بدون عنصر أب</SelectItem>
                    {topLevelItems
                      .filter((item) => item.id !== editingItem.id)
                      .map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.label}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {getChildItems(editingItem.id).length > 0 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    لا يمكن تغيير العنصر الأب لأن هذا العنصر يحتوي على عناصر
                    فرعية.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="edit-external">رابط خارجي</Label>
                <Switch
                  id="edit-external"
                  checked={editingItem.isExternal}
                  onCheckedChange={(checked) =>
                    setEditingItem({ ...editingItem, isExternal: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="edit-active">نشط</Label>
                <Switch
                  id="edit-active"
                  checked={editingItem.isActive}
                  onCheckedChange={(checked) =>
                    setEditingItem({ ...editingItem, isActive: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="edit-mobile">إظهار على الجوال</Label>
                <Switch
                  id="edit-mobile"
                  checked={editingItem.showOnMobile}
                  onCheckedChange={(checked) =>
                    setEditingItem({ ...editingItem, showOnMobile: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="edit-desktop">إظهار على سطح المكتب</Label>
                <Switch
                  id="edit-desktop"
                  checked={editingItem.showOnDesktop}
                  onCheckedChange={(checked) =>
                    setEditingItem({ ...editingItem, showOnDesktop: checked })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handleSaveEdit}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
