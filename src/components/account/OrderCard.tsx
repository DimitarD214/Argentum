"use client";

import { useState, useTransition } from "react";
import { Package, MapPin, CreditCard, Clock, ChevronDown, ChevronUp, AlertCircle, RefreshCw } from "lucide-react";
import { updateOrderStatus } from "@/app/account/actions";
import { toast } from "sonner";

interface OrderCardProps {
  order: any;
  isDev: boolean;
}

export default function OrderCard({ order, isDev }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  // Status mapping
  // DB status: 'paid', 'shipped', 'delivered'
  const currentStatus = order.status || "paid";

  const getStatusStep = (status: string) => {
    switch (status) {
      case "paid":
        return 1; // Processing
      case "shipped":
        return 2; // In Transit
      case "delivered":
      case "arrived":
        return 3; // Arrived
      default:
        return 0; // Received/Pending
    }
  };

  const currentStep = getStatusStep(currentStatus);

  const steps = [
    { label: "Zaprimljeno", desc: "Narudžba zaprimljena" },
    { label: "U pripremi", desc: "Plaćanje potvrđeno" },
    { label: "Poslano", desc: "U tranzitu" },
    { label: "Dostavljeno", desc: "Preuzmite paket" },
  ];

  const handleSimulateStatus = (status: string) => {
    startTransition(async () => {
      const res = await updateOrderStatus(order.id, status);
      if (res.success) {
        toast.success(`Status updated to ${status}`, {
          className: "font-sans text-sm",
          style: {
            background: "#fdfcf8",
            color: "#1a1a1a",
            border: "1px solid rgba(0,0,0,0.05)",
          },
        });
      } else {
        toast.error(res.error || "Failed to update status");
      }
    });
  };

  const formatDate = (timestamp: number | null) => {
    if (!timestamp) return "Datum nepoznat";
    return new Date(timestamp * 1000).toLocaleDateString("hr-HR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group">
      {/* Header Info */}
      <div className="bg-astera-50/40 p-6 border-b border-astera-100/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-soft-taupe mb-1">Datum kupnje</p>
          <p className="text-xs font-sans text-gray-900 font-medium">
            {formatDate(order.sessionCreated)}
          </p>
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-soft-taupe mb-1">Ukupno</p>
          <p className="text-xs font-sans text-gray-900 font-bold">€{order.total_amount?.toFixed(2)}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-[9px] uppercase tracking-[0.25em] font-bold text-soft-taupe mb-1">Broj narudžbe</p>
          <p className="text-xs font-mono text-gray-500 max-w-[140px] truncate" title={order.id}>
            {order.id}
          </p>
        </div>
      </div>

      {/* Main Card Body */}
      <div className="p-6 md:p-8 space-y-8">
        {/* Tracking Timeline */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-astera-900">
              Praćenje dostave
            </h4>
            <span className={`text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
              currentStep === 3 
                ? "bg-green-50 text-green-700 border border-green-100" 
                : currentStep === 2
                ? "bg-blue-50 text-blue-700 border border-blue-100"
                : "bg-amber-50 text-amber-700 border border-amber-100"
            }`}>
              {currentStep === 3 ? "Isporučeno" : currentStep === 2 ? "Poslano" : "U obradi"}
            </span>
          </div>

          {/* Graphical timeline */}
          <div className="relative pt-2 pb-6">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-150 -translate-y-1/2 z-0" />
            
            {/* Active Colored Line */}
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-astera-700 -translate-y-1/2 z-0 transition-all duration-1000 ease-out" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />

            {/* Steps Nodes */}
            <div className="relative z-10 flex justify-between">
              {steps.map((step, idx) => {
                const isCompleted = idx <= currentStep;
                const isActive = idx === currentStep;

                return (
                  <div key={idx} className="flex flex-col items-center text-center max-w-[80px]">
                    <div 
                      className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-1000 ${
                        isActive
                          ? "bg-astera-900 border-astera-900 text-white shadow-md shadow-astera-900/20 scale-110"
                          : isCompleted
                          ? "bg-astera-700 border-astera-700 text-white"
                          : "bg-white border-gray-250 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-[10px] font-bold">{idx + 1}</span>
                      )}
                    </div>
                    <div className="mt-3">
                      <p className={`text-[10px] font-sans font-bold tracking-wide transition-colors duration-500 ${
                        isActive ? "text-astera-900 font-extrabold" : isCompleted ? "text-gray-900" : "text-gray-400"
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dynamic Status Dashboard Notifications */}
        <div className="transition-all duration-500">
          {currentStep === 3 ? (
            // ARRIVED STATE
            <div className="bg-green-50/50 border border-green-100/50 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
                <Package size={20} />
              </div>
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-green-950 uppercase tracking-wider">Vaša pošiljka je stigla! 🎁</h5>
                {order.delivery_method === "boxnow" ? (
                  <p className="text-xs text-green-800 font-sans leading-relaxed">
                    Paket je uspješno dostavljen u vaš odabrani **Box Now pretinac #{order.boxnow_locker_id || "Dostupan"}**.
                    Jednokratni PIN kod za otvaranje pretinca poslan vam je putem SMS-a i e-pošte. Pretinac je dostupan 24/7.
                  </p>
                ) : (
                  <p className="text-xs text-green-800 font-sans leading-relaxed">
                    Paket je uspješno dostavljen na vašu kućnu adresu. Hvala vam na povjerenju!
                  </p>
                )}
              </div>
            </div>
          ) : (
            // IN TRANSIT OR PROCESSING STATE
            <div className="bg-astera-50/40 border border-astera-100/40 rounded-2xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-astera-100/50 flex items-center justify-center text-astera-700 shrink-0">
                <Clock size={20} className="animate-pulse" />
              </div>
              <div className="space-y-1.5">
                <h5 className="text-xs font-bold text-astera-955 uppercase tracking-wider">
                  {currentStep === 2 ? "Pošiljka je na putu" : "Narudžba se priprema"}
                </h5>
                <p className="text-xs text-soft-taupe font-sans leading-relaxed">
                  {currentStep === 2
                    ? "Vaša narudžba je predana dostavnoj službi i u tranzitu je. Očekivano vrijeme isporuke je 1-2 radna dana."
                    : "Vaše plaćanje je potvrđeno. Naši majstori ručno pripremaju i pakiraju vaše odabrane komade nakita."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Shipping Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-astera-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.1em] text-gray-900 mb-1">
                Način dostave
              </p>
              <p className="text-xs text-soft-taupe capitalize font-medium">
                {order.delivery_method === "boxnow" ? "Box Now Paketomat" : "Dostava na adresu"}
              </p>
              {order.delivery_method === "boxnow" && order.boxnow_locker_id && (
                <p className="text-[10px] text-gray-500 mt-1 font-mono">
                  ID Locker: #{order.boxnow_locker_id}
                </p>
              )}
              {order.shipping_address && (
                <div className="text-[10px] text-gray-500 mt-1 font-sans leading-relaxed">
                  <p>{order.shipping_address.street || order.shipping_address.line1}</p>
                  <p>
                    {order.shipping_address.zip || order.shipping_address.postal_code}{" "}
                    {order.shipping_address.city}
                  </p>
                  <p className="uppercase">{order.shipping_address.country}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-start gap-3 sm:justify-end">
            <CreditCard size={16} className="text-astera-400 mt-0.5 shrink-0" />
            <div className="sm:text-right">
              <p className="text-[10px] font-sans font-bold uppercase tracking-[0.1em] text-gray-900 mb-1">
                Plaćanje
              </p>
              <p className="text-xs text-soft-taupe font-medium">Sigurno plaćanje karticom</p>
              <p className="text-[10px] text-gray-500 mt-1 font-sans">
                Status transakcije: <span className="font-bold text-green-700">Plaćeno</span>
              </p>
            </div>
          </div>
        </div>

        {/* Line Items Details (Toggle Section) */}
        <div className="border-t border-gray-100 pt-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-between py-2 text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-soft-taupe hover:text-astera-900 transition-colors"
          >
            <span>{isOpen ? "Sakrij detalje narudžbe" : "Prikaži detalje narudžbe"}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {isOpen && (
            <div className="mt-4 space-y-4 border-t border-gray-50 pt-4 transition-all duration-300">
              {order.lineItems && order.lineItems.length > 0 ? (
                order.lineItems.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-astera-300 border border-gray-100">
                        <Package size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{item.description}</p>
                        <p className="text-[10px] text-soft-taupe">Količina: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-gray-900">
                      €{((item.amount_total || 0) / 100).toFixed(2)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-soft-taupe italic py-2">Detalji o artiklima nisu dostupni.</p>
              )}
            </div>
          )}
        </div>

        {/* Development Mode Simulator Panel */}
        {isDev && (
          <div className="border-t border-dashed border-gray-250 pt-6 mt-6 bg-gray-50/50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-astera-900">
              <RefreshCw size={14} className={isPending ? "animate-spin" : ""} />
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.15em]">
                Simulator dostave (Development Mode)
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSimulateStatus("paid")}
                disabled={isPending || currentStatus === "paid"}
                className={`px-3 py-1.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded border transition-all ${
                  currentStatus === "paid"
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : "bg-white border-gray-200 text-gray-700 hover:border-amber-400 hover:bg-amber-50/30"
                } disabled:opacity-50`}
              >
                1. U pripremi
              </button>
              <button
                onClick={() => handleSimulateStatus("shipped")}
                disabled={isPending || currentStatus === "shipped"}
                className={`px-3 py-1.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded border transition-all ${
                  currentStatus === "shipped"
                    ? "bg-blue-100 border-blue-300 text-blue-800"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-400 hover:bg-blue-50/30"
                } disabled:opacity-50`}
              >
                2. Poslano
              </button>
              <button
                onClick={() => handleSimulateStatus("delivered")}
                disabled={isPending || currentStatus === "delivered" || currentStatus === "arrived"}
                className={`px-3 py-1.5 text-[9px] font-sans font-bold uppercase tracking-wider rounded border transition-all ${
                  currentStatus === "delivered" || currentStatus === "arrived"
                    ? "bg-green-100 border-green-300 text-green-800"
                    : "bg-white border-gray-200 text-gray-700 hover:border-green-400 hover:bg-green-50/30"
                } disabled:opacity-50`}
              >
                3. Dostavljeno
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
