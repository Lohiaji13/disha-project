import { Link, Outlet } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { SignInButton } from "@/components/ui/signin.tsx";

export default function Layout() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Navbar / Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">

                    {/* Left - Logo */}
                    {/* Left - Logo */}
                    <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-110">
                        <GraduationCap className="h-8 w-8 text-blue-600" />
                        <Link to="/" className="text-xl font-bold text-gray-900 ">
                            Disha
                        </Link>
                    </div>
                
                    



                    {/* Center - Navigation Links */}
                    <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
                        {[
                            { label: "Features", to: "#features" },
                            { label: "How it Works", to: "#how-it-works" },
                            { label: "Colleges", to: "/colleges" },
                            { label: "Contact Us", to: "#contact" },
                        ].map((item) => (
                            <Link
                                key={item.label}
                                to={item.to}
                                className="relative group"
                            >
                                <span className="text-gray-700 transition-colors duration-200 group-hover:text-black">
                                    {item.label}
                                </span>
                                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Right - Sign In / Dashboard */}
                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <Button asChild>
                                <Link to="/dashboard">Dashboard</Link>
                            </Button>
                        ) : (
                            <SignInButton />
                        )}
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main>
                <Outlet />
            </main>
        </div>
    );
}
