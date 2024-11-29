"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, LayoutGrid, Link, Mail } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QRCodeSVG } from "qrcode.react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";

function QrCodeGenerator() {
    //stores url to be changed to QR code
    const [url, setUrl] = useState("");
    //hex coode for black:  #000000 , #FF0000
    const [color, setColor] = useState("#ffffff");
    const [bgColor, setBgColor] = useState(" #000000");
    //to add logo image in between QR if we want to
    const [logo, setLogo] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    //qrtype can be link or email
    const [qrType, setQrType] = useState("link");

    //to generate QR for email data
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const handleDownload = (type: "png" | "svg") => {
        const qrCodeElem = document.getElementById("qr-code");

        if (qrCodeElem) {
            if (type === "png") {
                toPng(qrCodeElem)
                    .then((dataUrl) => {
                        saveAs(dataUrl, "qr-code.png");
                    })
                    .catch((err) => {
                        console.log("Error generating QR code", err);
                    });
            } else if (type === "svg") {
                const svgElem = qrCodeElem.querySelector("svg");

                if (svgElem) {
                    const saveData = new Blob([svgElem.outerHTML], {
                        type: "image/svg+xml;charset=utf-8",
                    });
                    saveAs(saveData, "qr-code.svg");
                }
            }
        }
    };

    const handleEmailInput = () => {
        //create a mail to link
        const mailToLink = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(
            message
        )}`;

        //set the link in the url state variable for which the QR is created 
        setUrl(mailToLink);
    };

    return (
        <div className="relative z-30 mx-6 my-4 flex max-w-[1250px] w-full min-h-[750px] h-full">
            <Card className="flex-1 flex flex-col w-full h-auto mx-auto bg-[#ecf7ff]/80  backdrop-blur-md shadow-sm border-2 border-white/40 rounded-xl">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-center   text-teal-700">
                        QReasy
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                    <div className="h-full flex flex-col md:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                            {/* tabs for link or email tabs  */}
                            <Tabs
                                defaultValue="link"
                                className="space-y-6"
                                //change value of qr according to selected tab
                                onValueChange={(val) => setQrType(val)}
                            >
                                <TabsList className="h-10 w-full grid grid-cols-2 bg-teal-600 text-lg">
                                    {/* to switch between tabs we use tabstrigger  */}
                                    <TabsTrigger value="link" className="text-white font-bold">
                                        <Link className="w-4 h-4 mr-2" />
                                        Link
                                    </TabsTrigger>
                                    <TabsTrigger value="email" className="text-white font-bold">
                                        <Mail className="w-4 h-4 mr-2" />
                                        Email
                                    </TabsTrigger>
                                </TabsList>

                                <TabsContent value="link">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="url"
                                                className="font-bold text-teal-700"
                                            >
                                                URL
                                            </Label>
                                            <Input
                                                id="url"
                                                type="text"
                                                value={url}
                                                placeholder="https://example.com"
                                                onChange={(e) => setUrl(e.target.value)}
                                                className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="email">
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className="font-bold text-teal-700"
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={email}
                                                placeholder="Enter email"
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="subject"
                                                className="font-semibold text-teal-700"
                                            >
                                                Subject
                                            </Label>
                                            <Input
                                                id="subject"
                                                type="text"
                                                value={subject}
                                                placeholder="Enter subject"
                                                onChange={(e) => setSubject(e.target.value)}
                                                className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="message"
                                                className="font-semibold text-teal-700"
                                            >
                                                Message
                                            </Label>
                                            <Textarea
                                                id="message"
                                                value={message}
                                                placeholder="Enter message"
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400 h-24 resize-none"
                                            />
                                        </div>
                                        <Button
                                            className="py-7 px-8 bg-teal-700 font-bold rounded-full uppercase"
                                            onClick={handleEmailInput}
                                        >
                                            Generate Email QR Code
                                        </Button>
                                    </div>
                                </TabsContent>
                            </Tabs>


                            {/* set the qr code color and bg color  */}
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <div className="space-y-2 flex-1">
                                        <Label
                                            htmlFor="color"
                                            className="font-semibold text-teal-700"
                                        >
                                            QR Code Color
                                        </Label>

                                        <div className="flex items-center gap-1">
                                            <div
                                                className="relative w-12 flex-1 h-12 rounded-md border-2 border-white/70"
                                                style={{ backgroundColor: color }}
                                            >
                                                <input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => setColor(e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <Input
                                                type="text"
                                                value={color}
                                                onChange={(e) => setColor(e.target.value)}
                                                className="flex-1 border-2 h-12 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 flex-1">
                                        <Label
                                            htmlFor="color"
                                            className="font-semibold text-teal-700"
                                        >
                                            Background Color
                                        </Label>

                                        <div className="flex items-center gap-1">
                                            <div
                                                className="relative w-12 flex-1 h-12 rounded-md border-2 border-white/70"
                                                style={{ backgroundColor: bgColor }}
                                            >
                                            {/* type is set to color, it generates a color picker  */}
                                                <input
                                                    type="color"
                                                    value={color}
                                                    onChange={(e) => setBgColor(e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                />
                                            </div>
                                            <Input
                                                type="text"
                                                value={color}
                                                onChange={(e) => setBgColor(e.target.value)}
                                                className="flex-1 border-2 h-12 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* select the logo  */}
                                <div className="space-y-2">
                                    <Label htmlFor="logo" className="font-bold text-teal-700">
                                        Logo
                                    </Label>


                                    <Input
                                        type="file"
                                        id="logo"
                                        accept="image/*"
                                        onChange={(e: any) => {
                                            //incase multiple files are selected by user set the 0th index file as logo
                                            if (e.target.files && e.target.files[0]) {
                                                setLogoFile(e.target.files[0]);

                                                //javascript API to read content of file
                                                const reader = new FileReader();
                                                //when file is read, onloadend() runs what is inside it
                                                reader.onloadend = () => {
                                                    setLogo(reader.result as string);
                                                };
                                                //convert the image to URL so that it can be passed to center of image in QR.
                                                reader.readAsDataURL(e.target.files[0]);
                                            }
                                        }}
                                        className="w-full border-2 bg-transparent  border-white/70 focus:border-[#057FFF]/70 rounded-md outline-none focus-visible:ring-0 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="relative flex-1 bg-teal-600 rounded-lg flex flex-col justify-center space-y-6">


                            <div id="qr-code" className="flex justify-center p-8">
                                <div className="relative">
                                    {/* to display the qr code  */}
                                    <QRCodeSVG
                                        value={url}
                                        size={256}
                                        fgColor={color}
                                        bgColor={bgColor}
                                        //we can add an image inside QR as well if we want to
                                        imageSettings={
                                            //if logo is provided set its URL else no image
                                            logo
                                                ? { src: logo, height: 50, width: 50, excavate: true }
                                                : undefined
                                        }
                                    />


                                    {/* if logo exists then render the image of logo in center of QR  */}
                                    {logo && (
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-md border-none"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-center space-x-4 pb-6">
                                <Button variant="outline" onClick={() => handleDownload("png")}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download PNG
                                </Button>
                                <Button variant="outline" onClick={() => handleDownload("svg")}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Download SVG
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default QrCodeGenerator;