import Script from 'next/script'
import React from 'react'

const GoogleAnalytics = () => {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=G-4J6933SVTY"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-4J6933SVTY');
                `}
            </Script>
        </>
    )
}

export default GoogleAnalytics