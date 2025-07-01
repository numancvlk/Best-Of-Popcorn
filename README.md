# 🎬 REACT NATIVE - MOVIE & ACTOR APP 

## 🚀 Proje Hakkında 

Bu projede, frontend kısmında **React Native**, backend kısmında ise **express** kullandım. Veritabanı olarak **MongoDB** kullandım. Film ve aktör verilerini çekerken ise **TMDb API** kullandım.
Bu uygulamayla popüler film ve aktör verilerini görebileceğiniz bir mobil uygulamadır. Kullanıcılar, en güncel filmleri ve sevilen aktörleri kolayca bulabilir, arama yapabilir ve detay sayfalarında zengin bilgilere ulaşabilirler.

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
| Login Ekranı | Film Detay Sayfası | 
| :---------------------------------: | :------------------------: |
|![Login](https://github.com/user-attachments/assets/736d98e1-a29d-440e-a3ac-6b804098ca70) | ![Register](https://github.com/user-attachments/assets/7262252e-9f69-4a20-b188-37287ff25c47)

 | Admin Film Sayfası | Admin Actor Sayfası | 
| :---------------------------------: | :------------------------: |
| ![Admin_Film](https://github.com/user-attachments/assets/329ee2a6-6e9d-4cf3-ac08-d5a8b5e6a565) | ![Admin_Actors](https://github.com/user-attachments/assets/c114bcf7-4471-4642-89c0-447207a42263)

 | Admin Panel Sayfası | Update Role Sayfası | 
| :---------------------------------: | :------------------------: |
| ![AdminPanel](https://github.com/user-attachments/assets/66958a8f-0fe1-44c5-81ea-c07041539eb3) | ![UpdateRoles](https://github.com/user-attachments/assets/f00f2a71-6e68-4047-a51f-e37ec28556ed)


 | Film Detayları Sayfası | Yorum Kısmı | 
| :---------------------------------: | :------------------------: |
| ![Movie_Detail](https://github.com/user-attachments/assets/84166699-e9b0-42dd-8b66-382a2e6d9ea7) | ![Comments](https://github.com/user-attachments/assets/e9b9025f-afb2-4c3f-a7b6-072ad1bb749c)


 | Basic User Ana Sayfası | Movie Role Ana Sayfası | 
| :---------------------------------: | :------------------------: |
| ![BasicUserTabs](https://github.com/user-attachments/assets/98efb811-68ce-425e-b6f0-98a6cbec06c3) | ![actorLoverRole](https://github.com/user-attachments/assets/724e5e4a-826f-48b7-9e76-7687ce77995f)


 | Basic User Ana Sayfası |  
| :---------------------------------: | 
| ![movieLoverRole](https://github.com/user-attachments/assets/ba143e2d-3ec7-4eb5-ba09-92a133629da5)|


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
    * Projenin backend klasöründe ve frontend klasörününe, **`.env`** dosyanızı oluşturun. 
    **BACKEND .env dosyası**
      PORT = Uygulamanın backend'e istek göndereceği adres.
      MONGO_URI = MongoDB üzerinden aldığınız size özel olan connection string.
      JWT_SECRET = Kimlik doğrulama işlemleri için gereklidir.
      TMDB_API_KEY = The Movie Database üzerinden alacağınız API KEY.
      TMDB_BASE_URL = TMDB dökümantasyonundan ulaşabilirsiniz.

    **FRONTEND .env dosyası**
      API_URL = Uygulamanızın kendi BACKEND SUNUCUSUNA bağlanacağı ana adres (API_URL/api şeklinde).
      TMDB_POSTER = TMDB dökümantasyonundan ulaşabilirsiniz.
      TMDB_BACKDROP = TMDB dökümantasyonundan ulaşabilirsiniz.
      TMDB_PROFILE = TMDB dökümantasyonundan ulaşabilirsiniz.
      

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
