/* ASTERA DESIGN SYSTEM REMINDER: NEVER align text 100% to screen edges. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default async function AccountPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-40 pb-20 px-24 md:px-56 lg:px-80 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h1 className="font-serif text-5xl md:text-6xl text-black mb-4 uppercase tracking-tighter">My Account</h1>
            <p className="font-sans text-sm text-gray-500 tracking-widest uppercase">Welcome back, {session.user?.name}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-astera-50 p-8 border border-astera-100 rounded-xl">
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] mb-6">Profile Details</h3>
                <div className="space-y-4">
                  <p className="text-sm font-sans flex justify-between">
                    <span className="text-gray-400">Name:</span>
                    <span className="text-black">{session.user?.name}</span>
                  </p>
                  <p className="text-sm font-sans flex justify-between">
                    <span className="text-gray-400">Email:</span>
                    <span className="text-black">{session.user?.email}</span>
                  </p>
                  <p className="text-sm font-sans flex justify-between">
                    <span className="text-gray-400">Member Since:</span>
                    <span className="text-black">Spring 2026</span>
                  </p>
                </div>
                <button className="mt-10 text-[11px] font-sans font-semibold uppercase tracking-widest text-astera-600 hover:text-astera-800 transition-colors">
                  Edit Profile
                </button>
              </div>

              <div className="bg-[#1a1a1a] text-white p-8 rounded-xl shadow-lg">
                <h3 className="font-sans font-bold text-xs uppercase tracking-[0.2em] mb-4 text-astera-300">Astera Privé</h3>
                <p className="text-xs font-sans leading-relaxed text-gray-400 mb-6">
                  You are a Tier 1 member. 500 more points until exclusive early access to the Summer Collection.
                </p>
                <div className="w-full bg-gray-800 h-1 mb-4 rounded-full overflow-hidden">
                  <div className="bg-astera-400 h-full w-2/3"></div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-3xl">Recent Orders</h2>
                  <span className="text-[10px] font-sans font-medium text-gray-400 uppercase tracking-widest cursor-pointer hover:text-astera-600 transition-colors">View All</span>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-left font-sans">
                    <thead>
                      <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100">
                        <th className="px-6 py-4 font-semibold">Order ID</th>
                        <th className="px-6 py-4 font-semibold">Date</th>
                        <th className="px-6 py-4 font-semibold">Status</th>
                        <th className="px-6 py-4 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-50">
                        <td className="px-6 py-6 text-sm">#AS-92841</td>
                        <td className="px-6 py-6 text-sm text-gray-500">March 22, 2026</td>
                        <td className="px-6 py-6">
                          <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-astera-100 text-astera-700 rounded-full">Fulfilled</span>
                        </td>
                        <td className="px-6 py-6 text-sm font-semibold">$345.00</td>
                      </tr>
                      <tr className="border-b border-gray-50 opacity-60">
                        <td className="px-6 py-6 text-sm">#AS-92612</td>
                        <td className="px-6 py-6 text-sm text-gray-500">Feb 14, 2026</td>
                        <td className="px-6 py-6">
                          <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-100 text-gray-500 rounded-full">Delivered</span>
                        </td>
                        <td className="px-6 py-6 text-sm font-semibold">$120.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <div className="flex justify-between items-end mb-8 border-b border-gray-100 pb-4">
                  <h2 className="font-serif text-3xl">Your Wishlist</h2>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {/* Mock wishlist items */}
                  <div className="flex gap-4 items-center p-4 bg-gray-50 rounded-xl border border-transparent hover:border-astera-200 transition-all cursor-pointer">
                    <div className="w-20 h-20 bg-white rounded-lg border border-gray-100 flex items-center justify-center p-2">
                       <img src="/emerald-butterfly-ring.png" alt="Ring" className="object-cover w-full h-full" />
                    </div>
                    <div>
                      <p className="text-xs font-sans font-bold uppercase tracking-tight">Emerald Butterfly Ring</p>
                      <p className="text-xs font-sans text-astera-600 mt-1">$120.00</p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
