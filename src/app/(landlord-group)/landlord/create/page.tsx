import { PropertyForm } from "@/app/(landlord-group)/landlord/_components/property-form"

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 border max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <PropertyForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/images/card-image-placeholder.png"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover object-[700] dark:brightness-[0.2] dark:grayscale flex justify-center items-center"
        />
      </div>
    </div>
  )
}
