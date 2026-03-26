/* ASTERA DESIGN SYSTEM REMINDER: NEVER align text 100% to screen edges. Minimum padding: px-24 (mobile) / px-64+ (desktop) */
export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-astera-50 flex items-center justify-center px-24 md:px-64">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-12 text-center">
        <div className="w-20 h-20 bg-astera-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-astera-600">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h1 className="font-serif text-3xl text-astera-900 mb-4">Order Confirmed</h1>
        <p className="font-sans text-[14px] text-gray-500 leading-relaxed mb-8">
          Thank you for shopping with Astera. We&apos;ll send you a confirmation email and your exquisite pieces will be carefully packaged.
        </p>
        <a href="/shop" className="btn-astera w-full text-center block py-[16px] text-[13px]">Continue Shopping</a>
        <a href="/account" className="block mt-4 font-sans text-[13px] text-astera-600 hover:text-astera-800 underline underline-offset-2">View Order History</a>
      </div>
    </div>
  );
}
