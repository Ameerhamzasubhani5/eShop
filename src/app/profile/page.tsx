"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchCurrentUser, logoutUser, updateProfile } from "@/store/slices/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useApiFetch } from "@/lib/useApiFetch";
import type { Order } from "@/types";

function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, status, initialized } = useAppSelector((state) => state.auth);
  const { data: orders } = useApiFetch<Order[]>(user ? "/orders" : null);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "error">("idle");

  useEffect(() => {
    if (status === "idle" && !initialized) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, status, initialized]);

  useEffect(() => {
    if (initialized && !user) {
      router.push("/signin");
    }
  }, [initialized, user, router]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/");
  };

  const startEditing = () => {
    setNameDraft(user?.name ?? "");
    setSaveState("idle");
    setEditingName(true);
  };

  const handleSaveName = async () => {
    const trimmed = nameDraft.trim();
    if (trimmed.length < 2 || trimmed === user?.name) {
      setEditingName(false);
      return;
    }
    setSaveState("saving");
    const result = await dispatch(updateProfile({ name: trimmed }));
    if (updateProfile.fulfilled.match(result)) {
      setEditingName(false);
      setSaveState("idle");
    } else {
      setSaveState("error");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <p className="text-muted-foreground">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-3xl font-bold">My Profile</h1>

        <div className="border border-gray-200 rounded-2xl p-6 space-y-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
            {editingName ? (
              <div className="mt-1 space-y-2">
                <Input
                  value={nameDraft}
                  onChange={(e) => setNameDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveName()}
                  autoFocus
                />
                {saveState === "error" && (
                  <p className="text-xs text-red-500">Couldn&apos;t save. Try again.</p>
                )}
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveName} disabled={saveState === "saving"}>
                    {saveState === "saving" ? "Saving..." : "Save"}
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setEditingName(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-base font-medium">{user.name}</p>
                <button
                  onClick={startEditing}
                  className="text-xs text-muted-foreground underline hover:text-foreground"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
            <p className="text-base font-medium">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-bold">Order History</h2>
          {!orders || orders.length === 0 ? (
            <p className="text-sm text-muted-foreground">You haven&apos;t placed any orders yet.</p>
          ) : (
            <div className="border border-gray-200 rounded-2xl divide-y">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/orders/${order.id}`}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <p className="text-sm font-medium">Order #{order.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString()} · {order.items.length} item
                      {order.items.length === 1 ? "" : "s"}
                    </p>
                  </div>
                  <p className="text-sm font-semibold">${order.total.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <Button variant="outline" className="w-full" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;
