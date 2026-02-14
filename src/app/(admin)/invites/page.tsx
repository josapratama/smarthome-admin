import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MailPlus, Users, Clock, CheckCircle } from "lucide-react";

export default function InvitesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Home Invites</h1>
          <p className="text-sm text-muted-foreground">
            Manage home member invitations
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Send Invite
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Total Invites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">0</div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              <div className="text-3xl font-semibold">0</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div className="text-3xl font-semibold">0</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">
              Active Members
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div className="text-3xl font-semibold">0</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Pending Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-3 text-sm font-semibold">No pending invites</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Sent invitations will appear here
              </p>
              <Button className="mt-3" size="sm" variant="outline">
                <Plus className="h-3 w-3" />
                Send Invite
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Users className="h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-3 text-sm font-semibold">No recent activity</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Invite activity will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Invite Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <MailPlus className="h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 text-lg font-semibold">No invites found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Start by sending invitations to add members to homes
            </p>
            <div className="mt-4 flex gap-2">
              <Button>
                <Plus className="h-4 w-4" />
                Send First Invite
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4" />
                View Members
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
