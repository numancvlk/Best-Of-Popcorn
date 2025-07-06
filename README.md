# 🎬 REACT NATIVE - BEST OF POPCORN - MOVIE & ACTOR APP 

## 🚀 Proje Hakkında 

Bu mobil uygulama, React Native (TypeScript ile), Express.js (TypeScript ile) ve MongoDB teknolojilerini kullanarak geliştirilmiştir. Film ve aktör verileri için ise TMDb API'den faydalanılmıştır.
Uygulama, kullanıcılara popüler film ve aktör verilerine kolayca erişim imkanı sunar. En güncel filmleri ve sevilen aktörleri keşfedebilir, detaylı arama yapabilir ve zengin bilgi içerikli detay sayfalarına ulaşabilirsiniz.

## ✨ Özellikler 

* **🍿 Popüler Filmler Listesi:** Popüler filmleri tek bir sayfada görüntüleyin. 
* **🌟 Popüler Aktörler Listesi:** Popüler aktörleri tek bir sayfada görüntüleyin.
* **🔍 Arama Fonksiyonu:** Aradığınız filmi veya aktörü kolayca bulun. 
* **ℹ️ Detay Sayfaları:** Filmler ve aktörlerle ilgili detaylı bilgilere ulaşın.
* **💬 Yorum Fonksiyonu** İstediğiniz film ile ilgili düşüncelerinizi paylaşın.

## 👥 Kullanıcı Rolleri
* **✅ User Role:** Hem film hem de aktör sekmelerini görüntüleyebilir. Yorum yapabilir, film ve aktör detaylarına bakabilir. Default olarak kullanıcılar bu rol ile kayıt olur.
* **🎬 Movie Role:** Yalnızca film sekmesini görüntüleyebilir. Yorum yapabilir ve film detaylarına bakabilir.
* **🎭 Actor Role:** Yalnızca aktör sekmesini görüntüleyebilir. Aktör detaylarına göz atabilir.
* **🛡️ Admin:** Film, aktör ve admin paneline erişimi vardır. Admin panelinden kullanıcıları listeleyebilir ve kullanıcıların rollerini değiştirebilir.

---
### ❗Önemli Notlar
Yeni kayıtlı kullanıcıların rolü default olarak **User Role** olmaktadır. MongoDB üzerinden role kısmını **adminRole** yaparak bir kullanıcıyı admin yapabilirsiniz.

---
### 📸 Ekran Görüntüleri 
| Login Ekranı | Kayıt Ekranı | 
| :---------------------------------: | :------------------------: |
|![Login](https://github.com/user-attachments/assets/736d98e1-a29d-440e-a3ac-6b804098ca70) | ![Register](https://github.com/user-attachments/assets/7262252e-9f69-4a20-b188-37287ff25c47)

 | Admin Film Sayfası | Admin Actor Sayfası | 
| :---------------------------------: | :------------------------: |
| ![Admi_Film](https://github.com/user-attachments/assets/8e731448-98ba-4d8e-aa5d-d1df04b0a9ab) | ![Admin_Actors](https://github.com/user-attachments/assets/c114bcf7-4471-4642-89c0-447207a42263)

 | Admin Panel Sayfası | Update Role Sayfası | 
| :---------------------------------: | :------------------------: |
| ![AdminPanel](https://github.com/user-attachments/assets/66958a8f-0fe1-44c5-81ea-c07041539eb3) | ![UpdateRoles](https://github.com/user-attachments/assets/f00f2a71-6e68-4047-a51f-e37ec28556ed)

 | Film Detayları Sayfası | Yorum Kısmı | 
| :---------------------------------: | :------------------------: |
|  ![Movie_Detail](https://github.com/user-attachments/assets/6c12904f-334f-4be5-9bea-7d3a1b69b369) | ![yorumm](https://github.com/user-attachments/assets/210b925e-d9a2-4aa1-b437-d01503e0813d)


 | Actor Role Ana Sayfası | Movie Role Ana Sayfası | 
| :---------------------------------: | :------------------------: |
| ![actorLoverRole](https://github.com/user-attachments/assets/e9e8841e-2a91-422f-99a7-8bf0da56fce9) | ![MovieRole](https://github.com/user-attachments/assets/35b63e11-af2f-4f2c-a2ec-2fc89b6eb94f)

 | Basic User Ana Sayfası |  
| :---------------------------------: | 
| ![BasicUserRole](https://github.com/user-attachments/assets/06a6bac4-b4df-4d95-9646-6f702147052b)|


---
## 🚀 Kurulum ve Çalıştırma 

1.  **Gereksinimler:**
    * Bilgisayarınızda **Node.js**'in kurulu olması gerekmektedir.

### Adımlar 

1.  **Bağımlılıkları Yükleyin:**
      **Frontend ve backend klasörleri için ayrı ayrı bu adımı uygulamanız gerekmektedir**
    ```bash
    npm install
    ```

3.  **Ortam Değişkenlerini Ayarlayın:**
    Bu proje, API anahtarları gibi hassas bilgiler kullanır. Bu bilgileri doğrudan kodunuza yazmaktan kaçınmalısınız.
    Projenin backend klasöründe ve frontend klasörününe, **`.env`** dosyanızı oluşturun.
    
    **BACKEND .env dosyası**
      - PORT = Uygulamanın backend'e istek göndereceği adres.
      - MONGO_URI = MongoDB üzerinden aldığınız size özel olan connection string.
      - JWT_SECRET = Kimlik doğrulama işlemleri için gereklidir.
      - TMDB_API_KEY = The Movie Database üzerinden alacağınız API KEY.
      - TMDB_BASE_URL = TMDB dökümantasyonundan ulaşabilirsiniz.

    **FRONTEND .env dosyası**
      - API_URL = Uygulamanızın kendi BACKEND SUNUCUSUNA bağlanacağı ana adres (API_URL/api şeklinde).
      - TMDB_POSTER = TMDB dökümantasyonundan ulaşabilirsiniz.
      - TMDB_BACKDROP = TMDB dökümantasyonundan ulaşabilirsiniz.
      - TMDB_PROFILE = TMDB dökümantasyonundan ulaşabilirsiniz.
      

5.  **Uygulamayı Başlatın:**
        **Backend klasörüne gidip sunucuyu başlatın.**
    ```bash
    npm run dev
    ```
    
      **Frontend klasörüne gidip uygulamayı başlatın.**
    ```bash
    npx expo
    ```
    * Uygulama başarıyla başlatıldığında, emülatörde çalışmaya başlayacaktır. 🎉

---


## 🔗 Atıflar 

Tüm film ve aktör verileri [The Movie Database (TMDB)](https://www.themoviedb.org/) tarafından sağlanmaktadır.
