// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import slider1 from '../assets/home/sliderone.png'
// import slider2 from '../assets/home/Slidertwo.webp'
// import slider3 from '../assets/home/Sliderthree.webp'
import home_second from '../assets/home/home_second.png';
import homethree1 from '../assets/home/homethreeone.png'
import homethree2 from '../assets/home/homethreetwo.png'
import homethree3 from '../assets/home/homethreethree.png'
import product11 from '../assets/aly1.jpg'
import product12 from '../assets/aly2.jpg'
import product13 from '../assets/aly3.png'
import product14 from '../assets/aly4.png'
import product21 from '../assets/sar1.jpg';
import product22 from '../assets/sar2.jpg';
import product23 from '../assets/sar3.jpg';
import product25 from '../assets/sar5.jpg';


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
            // sider2img: slider2,
            // sider3img: slider3,
        },
        second: {
            short: "Special Offerings",
            title: "Invite Blessings, Wealth & Protection",
            subtitle: `Discover our sacred Sree Anjaneya Shani Raksha for shielding your family from negativity, and the auspicious Sree Astha Laxmi for inviting endless prosperity and fortune into your home. Bring home divine energy today.`,
            button: "Shop Now",
            image: home_second,
            design: aboutdesign,
        },        
        third: {
            design: design,
            image1: homethree1,
            title1: "Divine Protection",
            subtitle1: "Invoke the mighty blessings of Sree Anjaneya Shani Raksha to safeguard your home and loved ones from evil influences.",
            image2: homethree2,
            title2: "Wealth & Abundance",
            subtitle2: "Invite the grace of Sree Astha Laxmi — the divine source of endless prosperity, fortune, and happiness.",
            image3: homethree3,
            title3: "Handcrafted Divinity",
            subtitle3: "Every idol is intricately hand-finished by skilled artisans, capturing authentic spiritual energy and timeless tradition.",
        },        
        fourth: {
            short: "Our Collection",
            title: 'Exclusive Spiritual Products',
            sub: "Immerse yourself in our collection of beautifully crafted statues, artifacts, and ritual items that hold spiritual significance.",
            card: "Add Cart",
            buy: "Buy Now",
        },
        cartitle: "Premium Spiritual Idols",
        catsub: "Sacred Ritual & Puja Collections",
        categories: ['All', 'Sree Anjaneya', 'Sree Astha Laxmi', 'Balaji', 'Durga', 'Ek Onkar', 'Khanda', 'Krishna', 'Laxmi', 'Saibaba'],
        faqtitle: "Expert Guidance",
        faqsub: "Your Questions Answered",
        faqs: [
            {
                question: "What are the spiritual benefits of Sree Anjaneya Shani Raksha?",
                answer: "Sree Anjaneya Shani Raksha idol offers powerful protection from Shani doshas, evil eye, and negative energies. It brings courage, strength, and mental peace to your family.",
            },
            {
                question: "How does the Sree Astha Laxmi idol attract prosperity?",
                answer: "Sree Astha Laxmi idol invokes the blessings of the eight forms of Goddess Laxmi, ensuring wealth, success, good fortune, and abundance in your home and workplace.",
            },
            {
                question: "Are these spiritual idols ideal for home puja and gifting?",
                answer: "Yes! Both Sree Anjaneya and Sree Astha Laxmi idols are perfect for daily worship, festive rituals, and as auspicious gifts for housewarmings, weddings, or special occasions.",
            },
            {
                question: "How should I clean and maintain these idols?",
                answer: "Wipe gently with a clean, dry cloth to maintain their shine and sanctity. Avoid harsh chemicals and always handle with devotion and care.",
            },
        ],
        horizontal: [
            { image: person1, title: 'Sree Anjaneya Idol', link: "/product" },
            { image: person2, title: 'Sree Astha Laxmi Idol', link: "/product" },
            { image: person3, title: 'Divine God Statues', link: "/product" },
            { image: person4, title: 'Sacred Handicraft Decor', link: "/product" },
        ],        
        nine: {
            short: "Adorable Designs",
            title: "Handcrafted Spiritual Products",
            des: "Each of our sacred idols and spiritual decor pieces is lovingly handcrafted by skilled artisans. Discover unique designs that blend timeless tradition with exquisite craftsmanship, perfect for home puja, gifting, and adding divine grace to any space.",
            image: nine1,
        },        
        reviews: [
            {
                name: "Rajesh",
                date: "27 July 2023",
                rating: 5,
                review: "The Sree Anjaneya idol brings such positive energy to our home. Excellent craftsmanship and divine detailing — truly blessed to have it!",
                image: test1,
            },
            {
                name: "Priya",
                date: "26 June 2023",
                rating: 5,
                review: "Since installing the Sree Astha Laxmi idol, we feel abundance and good fortune flowing into our family business. A must-have for prosperity!",
                image: test2,
            },
            {
                name: "Amit",
                date: "29 July 2023",
                rating: 4,
                review: "Beautifully crafted idols with intricate designs. Fast shipping and well-packed. Highly recommend for anyone looking for authentic spiritual decor.",
                image: test3,
            },
            {
                name: "Stella",
                date: "15 June 2023",
                rating: 3,
                review: "The Saraswati statue is gorgeous and radiates a calming presence in my study. Packaging can be improved but overall very happy.",
                image: test4,
            },
            {
                name: "Meera",
                date: "10 May 2023",
                rating: 5,
                review: "I ordered the Sree Anjaneya Shani Raksha for my parents — they love it! We feel so much peace and protection at home now.",
                image: test1,
            },
            {
                name: "Arjun",
                date: "5 May 2023",
                rating: 5,
                review: "These idols are true works of art. The Sree Astha Laxmi I received is stunning and instantly elevated our pooja room’s aura.",
                image: test2,
            },
            {
                name: "Divya",
                date: "20 April 2023",
                rating: 4,
                review: "Wonderful spiritual collection. Loved the fine details and traditional look. Quick delivery and great customer service too!",
                image: test3,
            },
        ]
        
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
                    image1: product11,
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
                    image1: product21,
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