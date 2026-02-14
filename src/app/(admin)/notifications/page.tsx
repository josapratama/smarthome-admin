import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Mail, MessageSquare, Smartphone } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            Manage notification endpoints and delivery
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Add Endpoint
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Endpoints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">0</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Email
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              <div className="text-3xl font-semibold">0</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">SMS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              <div className="text-3xl font-semibold">0</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Push
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-purple-500" />
              <div className="text-3xl font-semibold">0</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Notification Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-3 text-sm font-semibold">
                No endpoints configured
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Add email, SMS, or push notification endpoints
              </p>
              <Button className="mt-3" size="sm" variant="outline">
                <Plus className="h-3 w-3" />
                Add Endpoint
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Mail className="h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-3 text-sm font-semibold">
                No notifications sent
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Notification history will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Notification Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border p-4 text-center">
              <Mail className="mx-auto h-8 w-8 text-blue-500" />
              <h3 className="mt-2 font-semibold">Email</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Send notifications via email
              </p>
              <Badge variant="secondary" className="mt-2">
                Coming Soon
              </Badge>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <MessageSquare className="mx-auto h-8 w-8 text-green-500" />
              <h3 className="mt-2 font-semibold">SMS</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Send SMS notifications
              </p>
              <Badge variant="secondary" className="mt-2">
                Coming Soon
              </Badge>
            </div>
            <div className="rounded-xl border p-4 text-center">
              <Smartphone className="mx-auto h-8 w-8 text-purple-500" />
              <h3 className="mt-2 font-semibold">Push</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Mobile push notifications
              </p>
              <Badge variant="secondary" className="mt-2">
                Coming Soon
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
