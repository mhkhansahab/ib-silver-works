import { VerifyForm } from "@/components/verify/verify-form";
import { SiteFooter } from "@/components/sections/footer";

export default function VerifyPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] flex-col">
      <section className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <VerifyForm />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
