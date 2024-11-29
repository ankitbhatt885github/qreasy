import Image from "next/image";
import QrCodeGenerator from "./QrCodeGenerator";

export default function Home() {
  return (
   <div className="min-h-[100vh] flex justify-center items-center bg-slate-500"><QrCodeGenerator /></div>
  );
}
