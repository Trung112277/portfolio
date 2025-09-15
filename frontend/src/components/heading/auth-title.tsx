import Image from "next/image";

export default function AuthTitle() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
        <Image src="/favicon.png" alt="Logo" width={75} height={75} />
        <h1 className="text-2xl font-bold text-center uppercase text-primary">Welcome User</h1>
        <p className="text-md text-center text-white">Please enter your details to continue</p>
    </div>
  );
}