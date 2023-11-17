const reportWebVitals = (onPerfEntry) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
        import('web-vitals').then(
            ({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
                getCLS(onPerfEntry); // Mesure le Cumulative Layout Shift (CLS)
                getFID(onPerfEntry); // Mesure le First Input Delay (FID)
                getFCP(onPerfEntry); // Mesure le First Contentful Paint (FCP)
                getLCP(onPerfEntry); // Mesure le Largest Contentful Paint (LCP)
                getTTFB(onPerfEntry); // Mesure le Time to First Byte (TTFB)
            }
        );
    }
};

export default reportWebVitals;
