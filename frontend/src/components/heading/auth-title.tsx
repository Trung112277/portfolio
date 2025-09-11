import Image from "next/image";

export default function AuthTitle() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <Image src="/favicon.png" alt="Logo" width={100} height={100} />
        <h1 className="text-3xl font-bold text-center uppercase text-primary">Welcome User</h1>
        <p className="text-lg text-center text-white">Please enter your details to continue</p>
    </div>
  );
}