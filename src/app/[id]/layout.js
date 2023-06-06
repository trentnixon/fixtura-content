import { ContentNavBar } from "@/components/templates";
import "../globals.css";

export default async function RootLayout({ children }) {
  return (
    <div className="min-h-full">
       <ContentNavBar />
       {children}
    </div>
  );
}
