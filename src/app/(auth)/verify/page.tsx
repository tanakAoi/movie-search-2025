export default function VerifyRequestPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h2 className="text-2xl font-bold">📩 Check your email</h2>
      <p className="mt-2 text-gray-600">
        We&apos;ve sent you a login link. It should arrive in a few seconds.
        <br />
        If you don&apos;t see it, check your spam folder.
      </p>
    </div>
  );
}
