import { createClient } from '@/utils/supabase/server';
import Stripe from 'stripe';
import { Package, MapPin, CreditCard, ChevronRight } from 'lucide-react';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy', {
  apiVersion: '2026-02-25.clover' as any,
});

export default async function OrdersList({ email }: { email: string }) {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_email', email);

  if (error || !orders || orders.length === 0) {
    return (
      <div className="card-luxury p-12 text-center flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-astera-50 flex items-center justify-center text-astera-200 mb-2">
          <Package size={24} />
        </div>
        <h3 className="font-serif text-xl text-astera-900">No Orders Found</h3>
        <p className="text-soft-taupe text-sm max-w-sm">You haven't placed any orders yet. Discover our exclusive collections to start your journey.</p>
        <a href="/shop" className="btn-luxury mt-4 inline-block">Explore Collections</a>
      </div>
    );
  }

  // Sort locally if created_at isn't guaranteed, or just rely on Supabase
  // We'll fetch line items from Stripe.
  const ordersWithItems = await Promise.all(
    orders.map(async (order) => {
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(order.id, { limit: 10 });
        const session = await stripe.checkout.sessions.retrieve(order.id);
        return { ...order, lineItems: lineItems.data, sessionCreated: session.created };
      } catch (err) {
        console.error('Failed to fetch from Stripe for order', order.id);
        return { ...order, lineItems: [], sessionCreated: null };
      }
    })
  );

  // Sort by session created desc
  ordersWithItems.sort((a, b) => (b.sessionCreated || 0) - (a.sessionCreated || 0));

  return (
    <div className="space-y-8">
      <h2 className="font-serif text-2xl text-astera-900 mb-6">Order History</h2>
      {ordersWithItems.map((order) => (
        <div key={order.id} className="card-luxury overflow-hidden group">
          {/* Header */}
          <div className="bg-astera-50/50 p-6 border-b border-astera-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-soft-taupe mb-1">Order Placed</p>
              <p className="text-sm font-sans text-gray-900">
                {order.sessionCreated 
                  ? new Date(order.sessionCreated * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
                  : 'Date Unknown'}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-soft-taupe mb-1">Total</p>
              <p className="text-sm font-sans text-gray-900">€{order.total_amount?.toFixed(2)}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-soft-taupe mb-1">Order #</p>
              <p className="text-xs font-sans text-gray-500 max-w-[120px] truncate" title={order.id}>{order.id}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-700 text-[10px]">
                  ✓
                </span>
                <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                  {order.status === 'paid' ? 'Processing' : order.status}
                </span>
              </div>
              
              <div className="space-y-4">
                {order.lineItems && order.lineItems.length > 0 ? (
                  order.lineItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                          <Package size={16} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.description}</p>
                          <p className="text-xs text-soft-taupe">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-900">€{((item.amount_total || 0) / 100).toFixed(2)}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-soft-taupe italic">Item details unavailable.</p>
                )}
              </div>
            </div>

            {/* Footer / Meta */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-100 mt-6">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-astera-300 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-900 mb-1">Delivery Method</p>
                  <p className="text-sm text-soft-taupe capitalize">{order.delivery_method || 'Standard'}</p>
                  {order.delivery_method === 'boxnow' && order.boxnow_locker_id && (
                    <p className="text-xs text-gray-500 mt-1">Locker ID: {order.boxnow_locker_id}</p>
                  )}
                  {order.shipping_address && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {order.shipping_address.city}, {order.shipping_address.country}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 sm:justify-end">
                <CreditCard size={16} className="text-astera-300 mt-0.5" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-gray-900 mb-1">Payment</p>
                  <p className="text-sm text-soft-taupe">Secure Checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
