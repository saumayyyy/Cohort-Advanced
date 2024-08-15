import { Children } from "react"

export default function signUpLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>){
    return (
        <html lang="en">
        <body>
            <div className="border-b h-[40px] text-center">
                20% Off for the next 3 days
            </div>
          {children}
        </body>
      </html>
    )
}