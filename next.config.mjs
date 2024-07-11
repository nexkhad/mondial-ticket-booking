/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['mondial-ticketing.s3.me-central-1.amazonaws.com','www.mondial.ae','static.vecteezy.com'],
        dangerouslyAllowSVG: true,
    },

};

export default nextConfig;
