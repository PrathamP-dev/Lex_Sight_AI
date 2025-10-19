'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LexSightLogo } from "@/components/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { ArrowLeft, Camera, User, Lock, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
    const { user, isLoading } = useAuth();
    const [avatarUrl, setAvatarUrl] = useState("https://github.com/shadcn.png");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();

    const userInitials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || user?.email?.[0].toUpperCase() || 'U';
    const displayName = user?.name || user?.email?.split('@')[0] || 'User';
    const [firstName, lastName] = user?.name ? user.name.split(' ') : ['', ''];
    
    // Update avatar when user data loads
    useEffect(() => {
        if (user?.image) {
            setAvatarUrl(user.image);
        }
    }, [user?.image]);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Please log in to view your profile</p>
                </div>
            </div>
        );
    }

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setAvatarUrl(e.target?.result as string);
                    toast({
                        title: "Profile Picture Updated",
                        description: "Your profile picture has been updated successfully.",
                    });
                };
                reader.readAsDataURL(file);
            } else {
                toast({
                    title: "Invalid File Type",
                    description: "Please select an image file (JPG, PNG, GIF, etc.)",
                    variant: "destructive",
                });
            }
        }
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
        });
    };

    const handlePasswordUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Password Updated",
            description: "Your password has been updated successfully.",
        });
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-background"></div>
            <div className="relative flex min-h-screen w-full items-start justify-center p-4 pt-8">
                <Link href="/home" className="absolute top-6 left-6">
                    <Button variant="outline">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Home
                    </Button>
                </Link>
                
                <Card className="mx-auto w-full max-w-4xl shadow-xl border-primary/20 bg-card/80 backdrop-blur-sm mt-16">
                    <CardHeader className="text-center pb-4">
                        <div className="flex justify-center items-center gap-3 mb-2">
                            <LexSightLogo className="h-9 w-9 text-primary" />
                            <CardTitle className="font-headline text-4xl">LexSight</CardTitle>
                        </div>
                        <CardDescription className="text-base">Manage your account settings and preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <div className="relative group">
                                <Avatar className="size-32 border-4 border-primary/20 transition-all group-hover:border-primary/40">
                                    <AvatarImage src={avatarUrl} alt={displayName} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">{userInitials}</AvatarFallback>
                                </Avatar>
                                <button
                                    onClick={handleAvatarClick}
                                    className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full shadow-lg transition-transform hover:scale-110"
                                >
                                    <Camera className="h-4 w-4" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    accept="image/*"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="font-headline text-2xl font-bold">{displayName}</h3>
                                <p className="text-sm text-muted-foreground">{user?.email}</p>
                            </div>
                        </div>

                        <Separator className="my-6" />

                        <Tabs defaultValue="profile" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="profile">
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </TabsTrigger>
                                <TabsTrigger value="security">
                                    <Lock className="mr-2 h-4 w-4" />
                                    Security
                                </TabsTrigger>
                                <TabsTrigger value="notifications">
                                    <Bell className="mr-2 h-4 w-4" />
                                    Notifications
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="profile" className="space-y-4 mt-6">
                                <form onSubmit={handleProfileUpdate} className="space-y-4">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" defaultValue={firstName} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" defaultValue={lastName} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" defaultValue={user?.email} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="organization">Organization</Label>
                                        <Input id="organization" placeholder="Your company or organization" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Role/Position</Label>
                                        <Input id="role" placeholder="e.g., Legal Consultant, Business Owner" />
                                    </div>
                                    <Button type="submit" className="w-full font-headline">
                                        Save Changes
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-4 mt-6">
                                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="current-password">Current Password</Label>
                                        <Input id="current-password" type="password" placeholder="Enter current password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="new-password">New Password</Label>
                                        <Input id="new-password" type="password" placeholder="Enter new password" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                                        <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                                    </div>
                                    <div className="rounded-lg bg-muted p-4 text-sm">
                                        <p className="font-medium mb-2">Password Requirements:</p>
                                        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                            <li>At least 8 characters long</li>
                                            <li>Contains uppercase and lowercase letters</li>
                                            <li>Contains at least one number</li>
                                            <li>Contains at least one special character</li>
                                        </ul>
                                    </div>
                                    <Button type="submit" className="w-full font-headline">
                                        Update Password
                                    </Button>
                                </form>
                            </TabsContent>

                            <TabsContent value="notifications" className="space-y-4 mt-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-medium">Email Notifications</Label>
                                            <p className="text-sm text-muted-foreground">Receive email updates about your documents</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-medium">Document Analysis Complete</Label>
                                            <p className="text-sm text-muted-foreground">Get notified when document analysis is complete</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-medium">Weekly Summary</Label>
                                            <p className="text-sm text-muted-foreground">Receive weekly summary of your activity</p>
                                        </div>
                                        <input type="checkbox" className="h-4 w-4 accent-primary" />
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                                        <div className="space-y-0.5">
                                            <Label className="text-base font-medium">Product Updates</Label>
                                            <p className="text-sm text-muted-foreground">Stay updated with new features and improvements</p>
                                        </div>
                                        <input type="checkbox" defaultChecked className="h-4 w-4 accent-primary" />
                                    </div>
                                    <Button className="w-full font-headline">
                                        Save Preferences
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
