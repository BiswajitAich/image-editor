import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Image Compressor & Format Change App',
  description: 'Compress and change the format of your images for free with our online tool. Optimize and enhance your images effortlessly.',
  keywords: 'image compressor, format changer, free image tool, online image editor,online image compressor, online image format change, jpeg to webp, webp to jpeg, image optimization',
  creator: 'Biswajit Aich',
  publisher: 'Biswajit Aich',
  openGraph: {
    type: "website",
    url: "https://image-editor-f79ctpzpt-biswajit-aichs-projects.vercel.app/",
    title: "My Website",
    description: "My Website Description",
    siteName: "Free image editor tool",
    images: [{
      url: "../../public/logo.png",
    }],
  }
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
