// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import slider1 from '../assets/home/sliderone.jpg'
import slider2 from '../assets/home/Slidertwo.jpg'
import slider3 from '../assets/home/Sliderthree.jpg'
import home_second from '../assets/home/home_second.png';
import homethree1 from '../assets/home/homethreeone.png'
import homethree2 from '../assets/home/homethreetwo.png'
import homethree3 from '../assets/home/homethreethree.png'
import product1 from '../assets/real7.jpg'
import product11 from '../assets/sal1.jpg'
import product12 from '../assets/sal2.jpg'
import product13 from '../assets/sal3.png'
import product14 from '../assets/sal4.png'
import product2 from '../assets/real8.jpg'
import product21 from '../assets/sar1.jpg';
import product22 from '../assets/sar2.jpg';
import product23 from '../assets/sar3.jpg';
// import product24 from '../assets/sar4.jpg';
import product25 from '../assets/sar5.jpg';


import bal_suvarna_image from '../assets/home/bal_suvarna_image.png';
import balaji_image from '../assets/home/balaji_image.png';
import durga_image from '../assets/home/durga_image.png';
import ek_onkar_image from '../assets/home/ek_onkar_image.png';
import krishna_image from '../assets/home/krishna_image.png';
import saibaba_image from '../assets/home/saibaba_image.png';
import laxmi_image from '../assets/home/laxmi_image.png';
import om_ganesha_image from '../assets/home/om_ganesha_image.png';
import about9 from '../assets/home/4.png';
import about10 from '../assets/home/5.png';
import about11 from '../assets/home/Group_133224.png';
import person1 from '../assets/home/980_x_860-1.jpg';
import person2 from '../assets/home/980_x_860-5.jpg';
import person3 from '../assets/home/980_x_860-6.jpg';
import person4 from '../assets/home/980_x_860-4.jpg';
import nine1 from '../assets/home/AdobeStock_385430086-copy_2.png';
import aboutdesign from '../assets/home/about.webp';
import design from '../assets/home/thirddesign.svg';
import test1 from '../assets/home/testimonial-1.jpeg';
import test2 from '../assets/home/testimonial-2.jpeg';
import test3 from '../assets/home/testimonial-3.jpeg';
import test4 from '../assets/home/testimonial-4.jpeg';
import aboutsec from '../assets/about/about07.jpg';
import contact from '../assets/contact/contact.jpeg';



const translations = {
    home: {
        logo: logo,
        links: [
            {
                title: 'Home',
                url: '/'
            },
            {
                title: 'Shop',
                url: '/shop',
            },
            {
                title: 'About',
                url: '/about'
            },
            {
                title: 'Contact',
                url: '/contact'
            }
        ],
        header: {
            short1: "Divine Protection",
            title1: 'Sacred Idols for Your Home',
            subtitle1: `Discover our collection of divine idols that bring protection and prosperity to your space.`,
            short2: "Spiritual Blessings",
            title2: 'Experience Divine Grace',
            subtitle2: `Embrace the protective powers of Sree Anjaneya and the prosperity blessings of Sree Astha Laxmi.`,
            short3: "Sacred Energy",
            title3: 'Transform Your Sacred Space',
            subtitle3: `Bring home these meticulously crafted idols that emanate divine energy and protection.`,
            button1: 'Shop Now',
            sider1img: slider1,
            sider2img: slider2,
            sider3img: slider3,
        },
        second: {
            short: "Special Offerings",
            title: 'Sacred Idols for Protection and Prosperity',
            subtitle: `Bring home divine protection with Sree Anjaneya and abundance with Sree Astha Laxmi.`,
            button: 'Shop Now',
            image: home_second,
            design: aboutdesign,
        },
        third: {
            design: design,
            image1: homethree1,
            title1: 'Protection Idols',
            subtitle1: 'Experience the protective shield of Sree Anjaneya, guarding against negative energies and Shani doshas.',
            image2: homethree2,
            title2: 'Prosperity Deities',
            subtitle2: 'Welcome abundance with Sree Astha Laxmi, the embodiment of wealth and prosperity.',
            image3: homethree3,
            title3: 'Sacred Craftsmanship',
            subtitle3: 'Each idol is crafted with devotion, preserving traditional artistry and spiritual essence.',
        },
        fourth: {
            short: "Our Collection",
            title: 'Exclusive Spiritual Products',
            sub: "Immerse yourself in our collection of beautifully crafted statues, artifacts, and ritual items that hold spiritual significance.",
            card: "Add Cart",
            buy: "Buy Now",
        },
        product: [
            { id: 1, category: 'Bal Suvarna', image: bal_suvarna_image },
            { id: 2, category: 'Balaji', image: balaji_image },
            { id: 3, category: 'Durga', image: durga_image },
            { id: 4, category: 'Ek Onkar', image: ek_onkar_image },
            { id: 6, category: 'Krishna', image: krishna_image },
            { id: 7, category: 'Laxmi', image: laxmi_image },
            { id: 8, category: 'Bal Suvarna', image: om_ganesha_image },
            { id: 9, category: 'Saibaba', image: saibaba_image },
        ],
        cartitle: "High Quality",
        catsub: "Special Ritual Products",
        categories: ['All', 'Bal Suvarna', 'Balaji', 'Durga', 'Ek Onkar', 'Khanda', 'Krishna', 'Laxmi', 'Saibaba'],
        faqtitle: "Expert Answers",
        faqsub: "Frequently Asked Questions",
        faqs: [
            {
                question: "What are the benefits of Sree Anjaneya idol?",
                answer: "Sree Anjaneya idol provides protection against Shani doshas and brings strength to your household.",
            },
            {
                question: "How does Sree Astha Laxmi idol help?",
                answer: "Sree Astha Laxmi idol symbolizes wealth and prosperity, perfect for both worship and home decoration.",
            },
            {
                question: "Are these idols suitable for home worship?",
                answer: "Yes, both idols are perfectly suited for home pooja rituals and sacred spaces.",
            },
            {
                question: "How should I maintain these idols?",
                answer: "Handle with care and respect. Regular cleaning with a soft cloth is recommended.",
            },
        ],
        images: about11,
        horizontal: [
            { image: person1, title: 'Krishna', link: "/product" },
            { image: person2, title: 'Gods Statue', link: "/product" },
            { image: person3, title: 'Goddess Statue', link: "/product" },
            { image: person4, title: 'Handicraft Accessories', link: "/product" },
        ],
        nine: {
            short: "Adorable Designs",
            title: "Handcrafted Spiritual Products",
            image: nine1,
        },
        reviews: [
            {
                name: "Rajesh",
                date: "27 July 2023",
                rating: 5,
                review: "The Sree Anjaneya idol brings such positive energy to our home. Excellent craftsmanship!",
                image: test1,
            },
            {
                name: "Priya",
                date: "26 June 2023",
                rating: 5,
                review: "Since installing Sree Astha Laxmi idol, we've felt more prosperity in our business.",
                image: test2,
            },
            {
                name: "Amit",
                date: "29 July 2023",
                rating: 4,
                review: "Beautiful craftsmanship and fast delivery. Highly recommend!",
                image: test3,
            },
            {
                name: "Stella",
                date: "15 June 2023",
                rating: 3,
                review: "Beautiful Saraswati statue but packaging could be improved.",
                image: test4,
            },
        ],
    },
    footerConfig: {
        contact: {
            logo: logo,
            // sub: "  Cursus turpis massa tincidunt dui ut ornare lectus sit. Enim sit amet venenatis urna cursus eget.Netus et malesuada fames ac.",
            title: "Contact Info",
            address: "Begumpet, Hyderabad, Telangana 500016",
            email: "israelitesshopping171@gmail.com",
            phone: "+91 9908 016 333"
        },
        usefulLinks: {
            title: "Useful Links",
            links: [
                { name: "Home", url: "/" },
                { name: "Store", url: "/shop" },
                { name: "About", url: "/about" },
                { name: "Help", url: "/contact" },
            ]
        },
        bottomSection: {
            copyright: "All Right Reserved © {year} Scared Relm",
            terms: {
                text: "Terms & Conditions",
                url: "/terms",
                text2: "Privacy Policy",
                url2: "/privacy",
                text3: "Return Policy",
                url3: "/return",
                text4: "Shipping Policy",
                url4: "/shipping",
                text5: "Cancellation Policy",
                url5: "/cancellation",

            }
        }
    },
    about: {
        title: 'About',
        subtitle: 'HOME > ABOUT',
        second: {
            short: "About Us",
            title: 'Discover Spiritual Artifacts That Inspire Serenity',
            subtitle: `Our collection of divine statues and spiritual artifacts is crafted to promote peace, mindfulness, and inner harmony. We bring you premium products that resonate with cultural and spiritual values.`,
            button: 'Shop Now',
            linkbutton: '/shop',
            image: aboutsec,
            design: aboutdesign,
        },
        short2: 'Our Mission',
        title2: "Celebrating Spiritual Heritage",
        sub2: `We aim to connect people with their spiritual roots through beautifully handcrafted statues and ritual products. Our offerings reflect devotion, artistry, and timeless traditions.`,
        horizontal: [
            { image: person1, title: 'Balaji Statue', link: "/product" },
            { image: person2, title: 'Durga Statue', link: "/product" },
            { image: person3, title: 'Krishna Statue', link: "/product" },
            { image: person4, title: 'OM Ganesha Statue', link: "/product" },
        ],
    },
    contact: {
        title: 'Contact',
        subtitle: 'HOME > CONTACT',
        second: {
            short: "Contact Us",
            title: 'Get In Touch With Us',
            subtitle: `Scelerisque fermentum dui faucibus in. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque aliquam vestibulum blandit.`,
        },
        section: {
            title: "Our Branches",
            sub: "Et odio pellentesque diam volutpat. Adipiscing diam donec adipiscing tristique risus. Turpis massa sed elementum tempus egestas sed.",
            branches: [
                { title: 'India', address: 'Begumpet, Hyderabad, Telangana', phone: '+91 9908 016 333' },
            ]
        },
        submit: {
            title: "Hello! Welcome to Creedy",
            sub: "Nisl pretium fusce id velit ut tortor pretium viverra. Risus quis varius quam quisque id. Tortor aliquam nulla facilisi cras fermentum odio eu feugiat. Dignissim sodales ut eu sem integer vitae justo eget magna. Pulvinar etiam posuere. ",
            img: contact,
            short: "Contact Us",
            title2: "Have Question? Get in Touch!",
            button: "Get In Touch"
        }
    },
    checkout: {
        title: "Checkout",
        order: "Order Summary",
        total: "Total",
        product: "Product",
        subtotal: "Subtotal",
        shipping: "Shipping",
        successfully: "Order Placed Successfully!",
        orderNumber: "Order Number",
        thank: "Thank you for your purchase!",
        continue: "Continue Shopping",
        sectitle: "Billing Details",
        firstname: "First Name",
        lastname: "Last Name",
        country: "Country",
        address: "Street Address",
        clientaddress: "Apartment, suite, etc. (optional)",
        city: "Town / City",
        phone: "Phone",
        email: "Email",
        processing: "Processing...",
        order: "Place Order",
        mode: "Payment Mode"
    },
    products: {
        categories: ['Idols'],
        cat: "Category",
        product: [
            {
                id: 1,
                category: 'Idols',
                cost: 2999,
                rating: 4,
                isNew: false,
                name: 'Sree Astha Laxmi',
                cod: true,
                online: true,
                photo: {
                    image1: product1,
                    image2: product11,
                    image3: product12,
                    image4: product13,
                    image5: product14,
                },
                description: 'An intricately designed idol of Sree Astha Laxmi, symbolizing wealth and prosperity, perfect for home decor and pooja rituals.'
            },
            {
                id: 2,
                category: 'Idols',
                cost: 2999,
                rating: 4,
                isNew: false,
                name: 'Sree Anjaneya Shani Raksha',
                cod: true,
                online: true,
                photo: {
                    image1: product2,
                    image2: product21,
                    image3: product22,
                    image4: product23,
                    image5: product25,
                },
                description: 'A divine idol of Sree Anjaneya, crafted to protect against Shani doshas, bringing peace and strength to your household.'
            },
        ],
    }

};

export default translations;