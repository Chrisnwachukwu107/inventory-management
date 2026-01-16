import { stackServerApp } from "@/stack/server";
import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

export async function getCurrentUser() {
  const user = await stackServerApp.getUser()

  if (!user) {
    redirect("/handler/sign-in");
    // return NextResponse.next();
  };

  return (user);
};
