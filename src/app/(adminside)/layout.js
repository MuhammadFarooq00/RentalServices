"use client";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  // Conditionally render header and footer based on the path
  const showHeaderFooter = !pathname.startsWith('/dashboard');

  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (header && footer) {
      if (!showHeaderFooter) {
        header.style.display = 'none';
        footer.style.display = 'none';
      } else {
        header.style.display = 'block';
        footer.style.display = 'block';
      }
    }

    return () => {
      if (header && footer) {
        header.style.display = 'block';
        footer.style.display = 'block';
      }
    };
  }, [pathname, showHeaderFooter]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
        {/* Moving gradient lines */}
        <div className="absolute inset-0">
          <div className="absolute h-[1px] w-full top-1/4 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-slide-right"></div>
          <div className="absolute h-[1px] w-full top-2/4 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent animate-slide-left"></div>
          <div className="absolute h-[1px] w-full top-3/4 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-slide-right"></div>
        </div>
        {/* Mesh gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/80 to-slate-900/80"></div>
      </div>
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes slide-left {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float 8s ease-in-out 4s infinite; }
        .animate-slide-right { animation: slide-right 15s linear infinite; }
        .animate-slide-left { animation: slide-left 15s linear infinite; }
      `}</style>
    </div>
  );
}
