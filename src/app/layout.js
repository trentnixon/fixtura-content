import "./globals.css";
import { Heebo } from "next/font/google";
import ClientAnalytics from "@/utils/ClientAnalytics";

const heebo = Heebo({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html>
      <ClientAnalytics />
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-2D02N6G8LH"
      ></script>
      <link rel="icon" type="image/png" href="/favicon-32x32.png" />
      <body>
        <div className={`${heebo.className} h-full bg-gray-100`}>
          {children}
        </div>
      </body>
    </html>
  );
}
