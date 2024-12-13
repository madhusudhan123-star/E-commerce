// import logo from '../assets/logo.svg';
import logo from '../assets/logo.png';
import slider1 from '../assets/home/sliderone.png'
import slider2 from '../assets/home/Slidertwo.png'
import slider3 from '../assets/home/Sliderthree.png'
import home_second from '../assets/home/home_second.png';
import homethree1 from '../assets/home/homethreeone.png'
import homethree2 from '../assets/home/homethreetwo.png'
import homethree3 from '../assets/home/homethreethree.png'
import product1 from '../assets/real7.jpg'
import product2 from '../assets/real8.jpg'
import product3 from '../assets/home/3.png'
import product4 from '../assets/home/4.png'
import product5 from '../assets/home/5.png'
import about1 from '../assets/home/708_x_1458.jpg';
import about2 from '../assets/home/AdobeStock_390870774_1.png';
import about3 from '../assets/home/img-3.jpg';
import about4 from '../assets/home/img-4.jpg';
import about5 from '../assets/home/img-5.jpg';
import about6 from '../assets/home/Mask_group.png';
import about7 from '../assets/real8.jpg';
import about8 from '../assets/home/3.png';
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
            short1: "Meditation",
            title1: 'Buy A Buddha Statue',
            subtitle1: `Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lectus viverra mauris.`,
            short2: "Enlightenment",
            title2: 'Feel Yourself Evolution',
            subtitle2: `Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lectus viverra mauris.`,
            short3: "Noble Truths",
            title3: 'Keep The Spirit Alive',
            subtitle3: `Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lectus viverra mauris.`,
            button1: 'Shop Now',
            sider1img: slider1,
            sider2img: slider2,
            sider3img: slider3,
        },
        second: {
            short: "Special Deals",
            title: 'Get 10% Offers On Gods Statues',
            subtitle: `Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lect`,
            button: 'Shop Now',
            image: home_second,
            design: aboutdesign,
        },
        third: {
            design: design,
            image1: homethree1,
            title1: 'Buddha Statue',
            subtitle1: 'Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lec',
            image2: homethree2,
            title2: 'Gods Statue',
            subtitle2: 'Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lec',
            image3: homethree3,
            title3: 'Goddess Statue',
            subtitle3: 'Rutrum quisque non tellus orci ac auctor augue. Massa sapien faucibus et molestie ac feugiat sed lec',
        },
        fourth: {
            short: "Our Collection",
            title: 'Pooja Accessories',
            sub: "Malesuada proin dolor ac diam congue suscipit. Proin a pellentesque tellus. Etiam facilisis lectus arcu, hendrerit commodo libero.",
            card: "Add Cart",
            buy: "Buy Now",
        },
        product: [
            { id: 1, category: 'Pooja Lamps', image: about1 },
            { id: 2, category: 'Agarbatti', image: about2 },
            { id: 3, category: 'Buddha Statue', image: about3 },
            { id: 4, category: 'Copper Lota', image: about4 },
            { id: 5, category: 'Pooja Lamps', image: about5 },
            { id: 6, category: 'Agarbatti', image: about6 },
            { id: 7, category: 'Buddha Statue', image: about7 },
            { id: 8, category: 'Copper Lota', image: about8 },
        ],
        cartitle: "High Quality",
        catsub: "Special Ritual Products",
        categories: ['All', 'Buddha Statue', 'Agarbatti', 'Pooja Lamps', 'Copper Lota'],
        faqtitle: "Expert Answers",
        faqsub: "Frequently Asked Questions",
        faqs: [
            {
                question: "Where Can I Learn About Meditation?",
                answer:
                    "Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            },
            {
                question: "What Benefits Does Meditation Provide?",
                answer:
                    "Meditation helps improve focus, reduce stress, and enhance overall well-being by creating a balanced state of mind and body.",
            },
            {
                question: "What Time Is Suitable For Meditation?",
                answer:
                    "The best time for meditation is early in the morning or just before bedtime when distractions are minimal and the mind is naturally calm.",
            },
            {
                question: "Do I Need A Specific Place To Meditate?",
                answer:
                    "No, meditation can be done anywhere that is quiet and comfortable. Creating a dedicated space may help maintain consistency.",
            },
        ],
        images: about11,
        horizontal: [
            { image: person1, title: 'Buddha Statue', link: "/product" },
            { image: person2, title: 'Gods Statue', link: "/product" },
            { image: person3, title: 'Goddess Statue', link: "/product" },
            { image: person4, title: 'Goddess Statue', link: "/product" },
        ],
        nine: {
            short: "Adorable Designs",
            title: "Handicraft Pooja Products",
            image: nine1,
        },
        reviews: [
            {
                name: "Jullia",
                date: "27 July 2023",
                rating: 4,
                review: "Integer sed felis id sapien ultricies accumsan. Fusce gravida nibh lectus, a vehicula mauris lobortis quis.",
                image: test1,
            },
            {
                name: "James",
                date: "26 June 2023",
                rating: 5,
                review: "Oiu lacinia massa eget magna iaculis porta. In aliquam, mi quis tincidunt maximus, justo mi varius orci, non.",
                image: test2,
            },
            {
                name: "Martin",
                date: "29 July 2023",
                rating: 4,
                review: "Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum. Ipsum nunc aliquet bibendum enim facilisis gravida.",
                image: test3,
            },
            {
                name: "Stella",
                date: "15 June 2023",
                rating: 3,
                review: "Tortor at auctor urna nunc id cursus metus aliquam eleifend. Eget egestas purus viverra accumsan in dolor sed.",
                image: test4,
            },
        ],
    },
    footerConfig: {
        contact: {
            logo: logo,
            sub: "  Cursus turpis massa tincidunt dui ut ornare lectus sit. Enim sit amet venenatis urna cursus eget.Netus et malesuada fames ac.",
            title: "Contact Info",
            address: "123 Street Name, City, Country",
            email: "example@email.com",
            phone: "000 123 456789"
        },
        usefulLinks: {
            title: "Useful Links",
            links: [
                { name: "Home", url: "/" },
                { name: "Store", url: "/store" },
                { name: "About", url: "/about" },
                { name: "Help", url: "/contact" },
            ]
        },
        bottomSection: {
            copyright: "All Right Reserved © {year} Designthemes",
            terms: {
                text: "Terms & Conditions",
                url: "#"
            }
        }
    },
    about: {
        title: 'About',
        subtitle: 'HOME > ABOUT',
        second: {
            short: "About Us",
            title: 'Meditation is the art of finding your inner peace',
            subtitle: `Scelerisque fermentum dui faucibus in. Integer malesuada nunc vel risus commodo viverra maecenas accumsan lacus. Neque aliquam vestibulum blandit.`,
            button: 'Shop Now',
            linkbutton: '/shop',
            image: aboutsec,
            design: aboutdesign,
        },
        short2: 'Service',
        title2: "What We Do Buddha",
        sub2: "Amet nulla facilisi morbi tempus iaculis urna id volutpat. Mattis vulputate enim nulla aliquet porttitor. Quam pellentesque nec nam aliquam sem et.",
        horizontal: [
            { image: person1, title: 'Buddha Statue', link: "/product" },
            { image: person2, title: 'Gods Statue', link: "/product" },
            { image: person3, title: 'Goddess Statue', link: "/product" },
            { image: person4, title: 'Goddess Statue', link: "/product" },
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
                { title: 'New York', address: '123 Street Name, City, Country', phone: '000 123 456789' },
                { title: 'California', address: '123 Street Name, City, Country', phone: '000 123 456789' },
                { title: 'Texas', address: '123 Street Name, City, Country', phone: '000 123 456789' },
                { title: 'Florida', address: '123 Street Name, City, Country', phone: '000 123 456789' },
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
    // products: {
    //     categories: ['Buddha Statue', 'Agarbatti', 'Pooja Lamps', 'Copper Lota'],
    //     cat: "Category",
    //     product: [
    //         {
    //             id: 1, category: 'Sree Astha Laxmi', cost: 2999, rating: 4, isNew: false, name: 'Sree Astha Laxmi', cod: true, online: true,
    //             photo: {
    //                 image1: product1,
    //                 image2: product1,
    //             },
    //             description: ''
    //         },
    //         {
    //             id: 2, category: 'Sree Anjaneya Shani Raksha', cost: 2999, rating: 4, isNew: false, name: 'Sree Anjaneya Shani Raksha', cod: true, online: true,
    //             photo: {
    //                 image1: product2,
    //                 image2: product2,
    //                 image3: product2,
    //                 image4: product2,
    //                 image5: product2,
    //                 image6: product2,
    //                 image7: product2,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //         {
    //             id: 3, category: '', cost: 23099, rating: 4, isNew: false, name: 'Shree Laxmi, Ekdanta Ganesha, Maa Saraswati', cod: true, online: true,
    //             photo: {
    //                 image1: product3,
    //                 image2: product3,
    //                 image3: product3,
    //                 image4: product3,
    //                 image5: product3,
    //                 image6: product3,
    //                 image7: product3,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //         {
    //             id: 4, category: 'Golden Temple', cost: 31919, rating: 4, isNew: false, name: 'Golden Temple', cod: true, online: true,
    //             photo: {
    //                 image1: product4,
    //                 image2: product4,
    //                 image3: product4,
    //                 image4: product4,
    //                 image5: product4,
    //                 image6: product4,
    //                 image7: product4,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //         {
    //             id: 5, category: 'Ashtavinayaka', cost: 31919, rating: 4, isNew: false, name: 'Ashtavinayaka', cod: true, online: true,
    //             photo: {
    //                 image1: product5,
    //                 image2: product5,
    //                 image3: product5,
    //                 image4: product5,
    //                 image5: product5,
    //                 image6: product5,
    //                 image7: product5,
    //             },
    //             description: 'This is a beautiful sandalwood stick.',
    //             isNew: false
    //         },
    //     ]
    // }
    products: {
        categories: ['Buddha Statue', 'Agarbatti', 'Pooja Lamps', 'Copper Lota', 'Idols', 'Temple Models'],
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
                    image2: product1,
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
                    image2: product2,
                    image3: product2,
                    image4: product2,
                    image5: product2,
                    image6: product2,
                    image7: product2,
                },
                description: 'A divine idol of Sree Anjaneya, crafted to protect against Shani doshas, bringing peace and strength to your household.'
            },
            {
                id: 3,
                category: 'Idols',
                cost: 23099,
                rating: 4,
                isNew: false,
                name: 'Shree Laxmi, Ekdanta Ganesha, Maa Saraswati',
                cod: true,
                online: true,
                photo: {
                    image1: product3,
                    image2: product3,
                    image3: product3,
                    image4: product3,
                    image5: product3,
                    image6: product3,
                    image7: product3,
                },
                description: 'A magnificent set of idols featuring Shree Laxmi, Ekdanta Ganesha, and Maa Saraswati, perfect for your pooja room and festivals.'
            },
            {
                id: 4,
                category: 'Temple Models',
                cost: 31919,
                rating: 4,
                isNew: false,
                name: 'Golden Temple',
                cod: true,
                online: true,
                photo: {
                    image1: product4,
                    image2: product4,
                    image3: product4,
                    image4: product4,
                    image5: product4,
                    image6: product4,
                    image7: product4,
                },
                description: 'A stunning model of the Golden Temple, crafted with attention to detail, ideal for gifting or as a centerpiece in your home.'
            },
            {
                id: 5,
                category: 'Idols',
                cost: 31919,
                rating: 4,
                isNew: false,
                name: 'Ashtavinayaka',
                cod: true,
                online: true,
                photo: {
                    image1: product5,
                    image2: product5,
                    image3: product5,
                    image4: product5,
                    image5: product5,
                    image6: product5,
                    image7: product5,
                },
                description: 'A sacred set of Ashtavinayaka idols, representing the eight holy forms of Lord Ganesha, a must-have for devotees.'
            },
        ]
    }

};

export default translations;