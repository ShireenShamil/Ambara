"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Eye, EyeOff, MapPin, Pencil, Shield, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ProfilePage() {
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
        
        <div className="grid gap-6">
          {/* Profile Overview Card */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Profile picture"
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full w-8 h-8"
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">John Doe</h2>
                <p className="text-muted-foreground mb-4">john@example.com</p>
                <p className="text-sm text-muted-foreground">Member since October 2023</p>
              </div>
            </div>
          </Card>

          {/* Tabs for Different Sections */}
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Delivery Address
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="grid gap-6 max-w-3xl">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          defaultValue="John"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          defaultValue="Doe"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          defaultValue="john@example.com"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+94 71 234 5678"
                          defaultValue="+94 71 234 5678"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Delivery Address Tab */}
            <TabsContent value="address">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="grid gap-6 max-w-3xl">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          placeholder="123 Main Street"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          placeholder="Colombo"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="province">Province</Label>
                        <Input
                          id="province"
                          placeholder="Western Province"
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          placeholder="10100"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          placeholder="Sri Lanka"
                          defaultValue="Sri Lanka"
                        />
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="deliveryInstructions">Delivery Instructions (Optional)</Label>
                      <Textarea
                        id="deliveryInstructions"
                        placeholder="Any specific instructions for delivery (e.g., Ring doorbell, Call upon arrival)"
                        className="min-h-[100px] resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <Button>Save Address</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="p-6">
                <div className="space-y-6">
                  <div className="grid gap-4 max-w-md">
                    <div className="grid gap-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter your current password"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <Button>Change Password</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}