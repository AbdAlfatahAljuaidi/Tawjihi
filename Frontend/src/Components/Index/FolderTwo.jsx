import React, { useEffect, useState } from "react";
import logo from '../../assets/logo.jpeg'
import { Link ,useNavigate } from "react-router-dom";
import axios from "axios";
import Folder from '../../../public/New folder (3).zip'
import image from '../../assets/imagefoldertwo.jpeg'
import { ArrowUp } from "lucide-react";
import pdf from '../../assets/مطبوعة التصريح بالضريبة على دخل الأشخاص الطبيعيين _250304_081215.pdf'





const FolderTwo = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate()

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

 async function signout(id) {
 
  try{
    const { data } = await axios.post(` ${apiUrl}/SignOut/${id}`);



    if(data.message == "تم تسجيل الخروج"){
      localStorage.removeItem("user");
      navigate("/LogIn");
    }

  }catch(error){
    console.log(error);
    
  }
 
  }


  useEffect(() => {
    // تحقق من أن المستخدم في الصفحة المحددة
    if (location.pathname === "/FolderTwo") {
      // إنشاء طبقة الغباش
      const blurLayer = document.createElement("div");
      blurLayer.style.position = "fixed";
      blurLayer.style.top = "0";
      blurLayer.style.left = "0";
      blurLayer.style.width = "100vw";
      blurLayer.style.height = "100vh";
      blurLayer.style.background = "rgba(0, 0, 0, 0.5)";
      blurLayer.style.backdropFilter = "blur(10px)";
      blurLayer.style.zIndex = "9999";
      blurLayer.style.display = "none";
      document.body.appendChild(blurLayer);

      // إنشاء رسالة التحذير
      const warningMessage = document.createElement("div");
      warningMessage.style.position = "fixed";
      warningMessage.style.top = "50%";
      warningMessage.style.left = "50%";
      warningMessage.style.transform = "translate(-50%, -50%)";
      warningMessage.style.background = "white";
      warningMessage.style.padding = "20px";
      warningMessage.style.borderRadius = "10px";
      warningMessage.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";
      warningMessage.style.fontSize = "18px";
      warningMessage.style.fontWeight = "bold";
      warningMessage.style.textAlign = "center";
      warningMessage.style.display = "none";
      warningMessage.style.zIndex = "10000";
      document.body.appendChild(warningMessage);

      // دالة لإظهار التحذير
      const showBlurMessage = (message) => {
        blurLayer.style.display = "block";
        warningMessage.textContent = message;
        warningMessage.style.display = "block";

        setTimeout(() => {
          blurLayer.style.display = "none";
          warningMessage.style.display = "none";
        }, 3000);
      };

      // منع أي ضغط على الكيبورد
      const disableKeyboard = (e) => {
        e.preventDefault();
        showBlurMessage("❌ غير مسموح باستخدام لوحة المفاتيح هنا!");
      };

      document.addEventListener("keydown", disableKeyboard);

      // منع النقر بزر الفأرة الأيمن
      const disableRightClick = (e) => {
        e.preventDefault();
        showBlurMessage("⚠️ النقر بزر الفأرة الأيمن غير مسموح!");
      };

      document.addEventListener("contextmenu", disableRightClick);

      // تنظيف الأحداث عند مغادرة الصفحة
      return () => {
        document.removeEventListener("keydown", disableKeyboard);
        document.removeEventListener("contextmenu", disableRightClick);
        document.body.removeChild(blurLayer);
        document.body.removeChild(warningMessage);
      };
    }
  }, [location.pathname]);

  //test
  

  return (
    <div className="w-full min-h-screen bg-gray-100 text-right   p-6">
          <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 bg-white text-black p-3 rounded-full shadow-lg transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      } animate-bounce`}
    >
      <ArrowUp size={24} />
    </button>
  <div className="sm:flex  items-center justify-between bg-gray-100 p-4 shadow-md">
        {/* القائمة على شكل أزرار */}
        <div className="flex text-center space-x-4">
          <button
            className="px-4 m-auto sm:m-0  py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
            onClick={() => signout(user._id)}
          >
            تسجيل الخروج
          </button>
          {user && user.Email === "mohamedmokhlessbenamor@gmail.com" && (
            <button className="px-4 py-2 bg-main hover:bg-hover text-white rounded-lg shadow transition">
              <Link to="/Dashboard" className="font-semibold text-white">
                لوحة التحكم
              </Link>
            </button>
          )}
        </div>

        <div className="flex my-9  space-x-5">
          <h1 className="text-xl font-semibold m-auto">
            <Link to="/ItalyStudyGuide" className="text-main border-2 border-transparent border-main py-5 px-3 transition duration-200 hover:bg-main hover:text-white">
            Dossier visa
            </Link>
          </h1>
          <h1 className="text-xl font-semibold">
          <Link
  to="/FolderTwo"
  className="text-main border-2 border-transparent border-main py-5 px-3 transition duration-200 hover:bg-main hover:text-white"
>
Dossier Bourse
</Link>

          </h1>
        </div>

        {/* الشعار */}
        <img src={logo} alt="Logo" className="w-16 h-16 sm:m-0 m-auto" />
      </div>

<div className="flex items-center justify-between bg-gray-100 p-4 shadow-md">
<section className="mb-6 p-4 bg-green-50 rounded-lg border-r-4 m-auto w-full   border-green-500">
        

<div className="max-w-4xl mx-auto p-4 pt-20">
      <h1 className="text-2xl font-bold mb-4 text-center">تصريح بالدخل السنوي 2023 (Declaration d'impot)</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">المرحلة الأولى: استخراج تصريح الدخل السنوي</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> استخراج التصريح من القباضة المالية</h3>
              <p className="text-gray-600">اذهب إلى القباضة المالية في 19 نهج الجزيرة، تونس العاصمة</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> ملء الأوراق PDF</h3>
              <p className="text-gray-600">
  قم بملء الأوراق PDF&nbsp;بعد طباعتها&nbsp;
  <a 
    href={pdf}
    download 
    className="text-blue-500 underline"
  >
    تحميل الملف
  </a>
</p>


            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> طلب Cachet + Quitance Rose</h3>
              <p className="text-gray-600">توجه إلى القباضة المالية واطلب ختم التصريح مع تسلم Quitance rose</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> تكلفة الإجراء</h3>
              <p className="text-gray-600">تأكد من إحضار حوالي 100 دينار</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 p-4 rounded-md shadow-sm">
          <h3 className="font-medium text-lg">ملاحظة</h3>
          <p className="text-gray-600">يمكنك الاستفسار في أقرب قباضة مالية عن إمكانية إتمام الإجراء، وفي حال عدم إمكانية ذلك يجب الذهاب إلى القباضة المالية في العنوان المذكور</p>
        </div>

        {/* المرحلة الثانية */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">المرحلة الثانية: الحصول على المصداقية للتصريح</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> الحصول على المصداقية من الإدارة المالية</h3>
              <p className="text-gray-600">توجه إلى الإدارة المالية في 36 شارع مرسيليا، تونس العاصمة</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> الإجراءات المطلوبة</h3>
              <p className="text-gray-600">أحضر تمبري قيمته 5 دينارات مع التصريح واذهب إلى الإدارة المالية</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> مدة الحصول على المصداقية</h3>
              <p className="text-gray-600">عادةً ما تستلم المصداقية بعد 24 ساعة</p>
            </div>
          </div>
        </div>

        {/* ورقة مطلب المنحة الدراسية */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">ورقة مطلب المنحة الدراسية</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> خطوات استخراج ورقة المطلب</h3>
              <p className="text-gray-600">
  قم بنفس الخطوات الموجودة في{" "}
  <a href="https://www.youtube.com/watch?si=7K42tQKJEwt55Cju&v=j2V4G6-BcIc&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">الفيديو الأول</a> 
  {" "} و{" "}
  <a href="https://www.youtube.com/watch?si=a3VqYqDwJiodW6I8&v=c4Y3zOhhN4g&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">الفيديو الثاني</a>، 
  ثم قم بتحميل ورقة المطلب PDF وطباعتها وإمضاءها وإضافتها إلى الملف.
</p>

            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> إضافة الورقة إلى الملف</h3>
              <p className="text-gray-600">أضف ورقة المطلب إلى ملفك بعد توقيعها</p>
            </div>
          </div>
        </div>

        {/* شهادة عدم ملكية */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">شهادة عدم ملكية</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg">ما هي شهادة عدم ملكية؟</h3>
              <p className="text-gray-600">هي شهادة تثبت أن الأب والأم ليس لهما ملكية عقارية في الولاية التي تسكن فيها</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg">كيفية استخراج الشهادة؟</h3>
              <p className="text-gray-600">إذا لم يكن لدى والديك ملكية في الولاية، يمكنك استخراج الشهادة من مصلحة "الملكية العقارية"</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg">في حال كان لدى الوالدين ملكية</h3>
              <p className="text-gray-600">إذا كان لدى الوالدين ملكية عقارية، يجب التوجه إلى إدارة الملكية العقارية في ولاية أخرى غير ولايتك</p>
            </div>
          </div>
        </div>

        {/* المرحلة الثالثة */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">المرحلة الثالثة: الحصول على مضمون حياة جماعية وورقة الترسيم المسبق</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> استخراج مضمون حياة جماعية</h3>
              <p className="text-gray-600">احصل على شهادة "مضمون حياة جماعية" من البلدية</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> استخراج ورقة الترسيم المسبق</h3>
              <p className="text-gray-600">
  قم باتباع نفس الخطوات الموجودة في الفيديوهات لتحميل ورقة الترسيم المسبق:  
  <a href="https://www.youtube.com/watch?si=fnwzAGqXSL9LXjJy&v=mbrDDzyuOAs&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">الفيديو الأول</a>،  
  <a href="https://www.youtube.com/watch?si=sfAE3IcTOvZB4DXX&v=tSjO3422PnQ&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">الفيديو الثاني</a>،  
  <a href="https://www.youtube.com/watch?si=NoAx9xym2PF8H-Nj&v=RavAnMFCOUI&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">الفيديو الثالث</a>،  
  و  
  <a href="https://www.youtube.com/watch?si=mZg6JCmeSr2uNqvf&v=dxEhfGsq4gs&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">الفيديو الرابع</a>
</p>

            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> نسخة من جواز السفر</h3>
              <p className="text-gray-600">تأكد من أن لديك نسخة من جواز السفر</p>
            </div>
          </div>
        </div>

        {/* ملاحظة حول المصادقة والترجمة */}
        <div className="bg-yellow-100 p-4 rounded-md shadow-sm">
          <h3 className="font-medium text-lg">ملاحظة حول المصادقة والترجمة</h3>
          <p className="text-gray-600">تأكد من أن جميع الوثائق الأصلية مترجمة ومصادق عليها، مع خطوات المصادقة التالية</p>
          <ol className=" ml-8">
            <li>نسخة مطابقة للأصل في البلدية</li>
            <li>مصادقة (Apostille) من عدل إشهاد</li>
            <li>ترجمة الوثيقة إلى الإيطالية بواسطة مترجم محلف</li>
            <li>مصادقة (Apostille) من عدل إشهاد على الترجمة</li>
          </ol>
        </div>

        {/* في حالة وفاة الوالدين */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">في حال وفاة الوالدين</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> شهادة وفاة الوالدين</h3>
              <p className="text-gray-600">إذا كان الوالدان متوفيين، يجب إحضار شهادة الوفاة</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> الإجراءات على شهادة الوفاة</h3>
              <p className="text-gray-600">اتبع نفس إجراءات المصادقة والترجمة على شهادة الوفاة كما في باقي الوثائق</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-sm">
              <h3 className="font-medium text-lg"> الوثائق المطلوبة الأخرى</h3>
              <p className="text-gray-600">لا تحتاج إلى شهادة ملكية أو دخل سنوي إذا كان الوالدان متوفيين</p>
            </div>
          </div>
        </div>

      {/* إرسال الأوراق بالبريد */}
<div className="bg-gray-100 p-4 rounded-lg shadow-md">
  <h2 className="text-xl font-semibold mb-4">إرسال الأوراق بالبريد</h2>
  <div className="space-y-4">
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="font-medium text-lg">إعداد الملف</h3>
      <p className="text-gray-600">ضع جميع الوثائق في ظرف وأرسلها عبر البريد</p>
    </div>
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="font-medium text-lg">إرسال البريد المضمون</h3>
      <p className="text-gray-600">اذهب إلى مركز البريد وارسله على شكل "بريد مضمون الوصول"</p>
    </div>
    <div className="bg-white p-4 rounded-md shadow-sm">
      <h3 className="font-medium text-lg">كتابة عنوان الجهة المعنية</h3>
      <p className="text-gray-600">
        قم بكتابة عنوان المؤسسة المالية المعنية بشؤون الطلبة حسب الجامعة التي ترغب في الدراسة بها
      </p>
    </div>
  </div>
  <p className="text-gray-600 mt-4">
    وذلك بعد كتابة عنوان مؤسسة الخدمات المالية المهتمة بشؤون الطلبة، 
    حيث يتغير العنوان حسب الجامعة التي تريد الدراسة فيها والمقاطعة التابعة لها. 
    كما يجب عليك كتابة اسمك ولقبك كما هو مبين في هذه الصور 
  </p>
  <a href={Folder}>اضغط لتحميل الصور </a>
</div>

        {/* ملاحظة حول العنوان وإرسال الظرف */} 
<div className="bg-yellow-100 p-4 rounded-md shadow-sm">
  <h3 className="font-medium text-lg">ملاحظة حول العنوان وإرسال الظرف</h3>
  <p className="text-gray-600">يرجى التأكد من كتابة عنوان المؤسسة بشكل صحيح على الظرف قبل إرساله</p>
  <ul className=" ml-8">
    <li>لكل جامعة تريد الدراسة فيها، يجب كتابة العنوان التالي على الظرف: "Servizio Benefici e interventi Monetari"</li>
    <li>
   إذا كنت تريد الدراسة في مدن مثل بيزا أو سيينا أو فلورنسا، يجب كتابة العنوان الخاص بها    
   {" "}
  <a href={image} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
    اضغط هنا لعرض الصورة 
  </a>
</li>

    <li>لا ترسل الظرف بدون ورقة المطلب (تم ترك بعض الفيديوهات التي ستساعدك في استخراجها)</li>
  </ul>
  <p className="text-gray-600">ملاحظة: هناك بعض الفيديوهات المفيدة التي تحتوي على موسيقى في البداية، يمكنك تخطي هذا الجزء نظرًا لتحريمه. شكرًا</p>
</div>


{/* روابط مفيدة */} 
<div className="bg-yellow-100 p-4 rounded-md shadow-sm">
  <h3 className="font-medium text-lg">روابط مفيدة</h3>
  <ul className="ml-8">
  <li>
    <a href="https://www.youtube.com/watch?si=UqvG-K_7AwjHKQIW&v=lRBRYbRAcXA&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
      حسن الظن بالله
    </a>
  </li>
  <li>
    <a href="https://www.youtube.com/watch?si=7w_q4D9KSXMirfdr&v=eQqwUe4ShRo&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
      كيف تختار الشعبة والجامعة المناسبة
    </a>
  </li>
  <li>
    <a href="https://www.youtube.com/watch?si=OTHe1Rng0iLP-KM1&v=rYGp0V6_cHQ&feature=youtu.be" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
      رابط حساب Codice fiscale خاصتك في إيطاليا
    </a>
  </li>
  <li>
  <ul className="ml-8">
  <li>
    <a href="https://chat.whatsapp.com/LN9ptzmqTyOBqboG4KCiWb" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
      رابط مجموعة واتساب خاصة بكل من اشترى الملف لتبادل الأسئلة والتجارب
    </a>
  </li>
  <li>
    <a href="https://www.codicefiscaleonline.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
      كيف تختار الشعبة والجامعة المناسبة
    </a>
  </li>
</ul>

  </li>
</ul>


</div>
<p className="text-gray-600">و السلام عليكم ورحمة الله</p>
      </div>
    </div>
</section>
    </div>
    </div>
  )
}

export default FolderTwo