import React, {
    useState,
    useEffect
} from 'react';
import {
    Menu,
    X,
    Code2,
    Database,
    Layout,
    Mail,
    ArrowRight,
    ChevronRight,
    Globe,
    Server
} from 'lucide-react';

export default function OnePagePortfolio() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll dinleyicisi (Header'ın arka planını değiştirmek için)
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Yumuşak kaydırma (Smooth Scroll) fonksiyonu
    const scrollToSection = (e, sectionId) => {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 80; // Header yüksekliği kadar boşluk bırak
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    const navItems = [{
            name: 'Hakkımda',
            id: 'about'
        },
        {
            name: 'Hizmetler',
            id: 'services'
        },
        {
            name: 'Projeler',
            id: 'projects'
        },
    ];

    return ( <
        div className = "min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100" > {
            /* HEADER / NAVIGATION */ } <
        header className = {
            `fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`
        } >
        <
        div className = "max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between" >
        <
        div className = "text-2xl font-bold tracking-tighter cursor-pointer"
        onClick = {
            (e) => scrollToSection(e, 'home')
        } >
        Dev < span className = "text-blue-600" > Studio. < /span> <
        /div>

        {
            /* Desktop Nav */ } <
        nav className = "hidden md:flex items-center space-x-8" > {
            navItems.map((item) => ( <
                a key = {
                    item.id
                }
                href = {
                    `#${item.id}`
                }
                onClick = {
                    (e) => scrollToSection(e, item.id)
                }
                className = "text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors" >
                {
                    item.name
                } <
                /a>
            ))
        } <
        button onClick = {
            (e) => scrollToSection(e, 'contact')
        }
        className = "bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors shadow-sm" >
        İletişime Geç <
        /button> <
        /nav>

        {
            /* Mobile Menu Toggle */ } <
        button className = "md:hidden text-slate-900"
        onClick = {
            () => setIsMobileMenuOpen(!isMobileMenuOpen)
        } >
        {
            isMobileMenuOpen ? < X size = {
                24
            }
            /> : <Menu size={24} / >
        } <
        /button> <
        /div>

        {
            /* Mobile Nav */ } {
            isMobileMenuOpen && ( <
                div className = "md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-slate-100 py-4 px-6 flex flex-col space-y-4" > {
                    navItems.map((item) => ( <
                        a key = {
                            item.id
                        }
                        href = {
                            `#${item.id}`
                        }
                        onClick = {
                            (e) => scrollToSection(e, item.id)
                        }
                        className = "text-lg font-medium text-slate-800" >
                        {
                            item.name
                        } <
                        /a>
                    ))
                } <
                button onClick = {
                    (e) => scrollToSection(e, 'contact')
                }
                className = "bg-slate-900 text-white px-6 py-3 rounded-xl text-center font-medium w-full" >
                İletişime Geç <
                /button> <
                /div>
            )
        } <
        /header>

        <
        main > {
            /* HERO SECTION (Clarion tarzı ferah ve güçlü) */ } <
        section id = "home"
        className = "pt-40 pb-20 md:pt-52 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center text-center" >
        <
        div className = "inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100 mb-8" >
        <
        span className = "flex h-2 w-2 rounded-full bg-green-500" > < /span> <
        span className = "text-xs font-semibold text-slate-600 uppercase tracking-wider" > Yeni Projelere Açık < /span> <
        /div> <
        h1 className = "text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight mb-8" >
        Fikirlerinizi < span className = "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500" > Ölçeklenebilir < /span> Dijital Ürünlere Dönüştürüyoruz <
        /h1> <
        p className = "text-lg md:text-xl text-slate-600 max-w-2xl mb-12 leading-relaxed" >
        Üst düzey firmalar için modern, hızlı ve güvenli web uygulamaları geliştiriyorum.Frontend zarafetini Backend gücüyle birleştirin. <
        /p> <
        div className = "flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4" >
        <
        button onClick = {
            (e) => scrollToSection(e, 'projects')
        }
        className = "bg-blue-600 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center" >
        Projelerimi İncele < ArrowRight className = "ml-2"
        size = {
            18
        }
        /> <
        /button> <
        button onClick = {
            (e) => scrollToSection(e, 'services')
        }
        className = "bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-full text-base font-semibold hover:bg-slate-50 transition-all shadow-sm flex items-center justify-center" >
        Hizmetler <
        /button> <
        /div> <
        /section>

        {
            /* ABOUT SECTION */ } <
        section id = "about"
        className = "py-24 bg-white" >
        <
        div className = "max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center" >
        <
        div className = "space-y-6" >
        <
        h2 className = "text-3xl md:text-4xl font-bold tracking-tight text-slate-900" >
        Teknoloji ile İş Süreçlerinizi İyileştirin <
        /h2> <
        p className = "text-slate-600 text-lg leading-relaxed" >
        Yılların getirdiği deneyimle, sadece kod yazmıyor, aynı zamanda işletmenizin büyümesine katkı sağlayacak mimariler tasarlıyorum.Kullanıcı deneyimini merkeze alan arayüzler ve yük altında ezilmeyen sağlam arka plan sistemleri inşa etmek uzmanlık alanım. <
        /p> <
        ul className = "space-y-3 pt-4" > {
            ['Modern Tech Stack (React, Next.js, Node.js)', 'Uçtan Uca (End-to-End) Geliştirme', 'Performans ve Güvenlik Odaklı Mimari'].map((item, i) => ( <
                li key = {
                    i
                }
                className = "flex items-center text-slate-700 font-medium" >
                <
                ChevronRight className = "text-blue-600 mr-2"
                size = {
                    20
                }
                /> {
                    item
                } <
                /li>
            ))
        } <
        /ul> <
        /div> {
            /* Clarion stili görsel yerleşimi (Görseli kendi resminle değiştirebilirsin) */ } <
        div className = "relative" >
        <
        div className = "aspect-square rounded-3xl overflow-hidden bg-slate-100 shadow-xl border border-slate-200" >
        <
        img src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        alt = "Developer Desk"
        className = "w-full h-full object-cover" /
        >
        <
        /div> <
        div className = "absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-slate-100" >
        <
        p className = "text-4xl font-extrabold text-blue-600" > 10 + < /p> <
        p className = "text-sm font-semibold text-slate-600 mt-1" > Yıllık Deneyim < /p> <
        /div> <
        /div> <
        /div> <
        /section>

        {
            /* SERVICES SECTION (Clarion tarzı temiz kartlar) */ } <
        section id = "services"
        className = "py-24 bg-slate-50" >
        <
        div className = "max-w-7xl mx-auto px-6 md:px-12" >
        <
        div className = "text-center max-w-2xl mx-auto mb-16" >
        <
        h2 className = "text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-4" > Uzmanlık Alanlarım < /h2> <
        p className = "text-slate-600 text-lg" > Projenizin ihtiyaç duyduğu tüm teknik donanımı tek bir çatı altında sunuyorum. < /p> <
        /div>

        <
        div className = "grid grid-cols-1 md:grid-cols-3 gap-8" > {
            [{
                    title: 'Frontend Geliştirme',
                    desc: 'React ve Next.js ile kusursuz, hızlı ve mobil uyumlu kullanıcı arayüzleri tasarımı.',
                    icon: < Layout size = {
                        32
                    }
                    className = "text-blue-600" / >
                },
                {
                    title: 'Backend Sistemleri',
                    desc: 'Node.js, Python ve bulut tabanlı mimariler ile güvenli ve ölçeklenebilir altyapılar.',
                    icon: < Server size = {
                        32
                    }
                    className = "text-blue-600" / >
                },
                {
                    title: 'Veritabanı Mimarisi',
                    desc: 'SQL ve NoSQL çözümleriyle verilerinizin güvenli, hızlı ve optimize şekilde yönetilmesi.',
                    icon: < Database size = {
                        32
                    }
                    className = "text-blue-600" / >
                }
            ].map((service, idx) => ( <
                div key = {
                    idx
                }
                className = "bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 group" >
                <
                div className = "bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform" > {
                    service.icon
                } <
                /div> <
                h3 className = "text-xl font-bold text-slate-900 mb-3" > {
                    service.title
                } < /h3> <
                p className = "text-slate-600 leading-relaxed" > {
                    service.desc
                } < /p> <
                /div>
            ))
        } <
        /div> <
        /div> <
        /section>

        {
            /* CONTACT SECTION */ } <
        section id = "contact"
        className = "py-24 bg-slate-900 text-white" >
        <
        div className = "max-w-4xl mx-auto px-6 md:px-12 text-center" >
        <
        h2 className = "text-3xl md:text-5xl font-bold tracking-tight mb-6" > Projenizi Konuşalım < /h2> <
        p className = "text-slate-300 text-lg mb-10 max-w-2xl mx-auto" >
        Sektördeki en iyi standartları projenize uygulamak için buradayım.Hemen iletişime geçin, vizyonunuzu koda dökelim. <
        /p> <
        a href = "mailto:hello@example.com"
        className = "inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-500 transition-all shadow-lg hover:shadow-blue-600/20" >
        <
        Mail className = "mr-3"
        size = {
            24
        }
        /> hello@example.com <
        /a> <
        /div> <
        /section> <
        /main>

        {
            /* FOOTER */ } <
        footer className = "bg-slate-950 py-8 border-t border-slate-800" >
        <
        div className = "max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between" >
        <
        div className = "text-xl font-bold tracking-tighter text-white mb-4 md:mb-0" >
        Dev < span className = "text-blue-500" > Studio. < /span> <
        /div> <
        p className = "text-slate-400 text-sm" > ©{
            new Date().getFullYear()
        }
        Tüm Hakları Saklıdır. <
        /p> <
        /div> <
        /footer> <
        /div>
    );
}