import Image, { ImageProps } from "next/image";

export default function Logo({ ...props }: Omit<ImageProps, "height" | "src" | "alt">) {
    return <div className="flex items-end space-x-px">
        <Image height={500} width={500} {...props} src="/images/logo.svg" alt="Logo" className="h-5 w-auto" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-primary-600 font-extrabold leading-none text-xl">Geotrack</span>
    </div>
}