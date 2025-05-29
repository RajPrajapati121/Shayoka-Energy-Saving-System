function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });

  locoScroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },

    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },

    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();

 

  
    ScrollTrigger.create({
      trigger: "#page>canvas",
      pin: true,
      scroller: "#main",
      start: "top top",
      end: "600% top",
    });

    gsap.to("#page1", {
      scrollTrigger: {
        trigger: `#page1`,
        start: `top top`,
        end: `bottom top`,
        pin: false,
        scroller: `#main`,
      },
    });

    gsap.to("#page3", {
      scrollTrigger: {
        trigger: `#page3`,
        start: `top top`,
        end: `300% top`,
        pin: true,
        scroller: `#main`,
      },
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          y: 200,
          opacity: 0,
          zIndex: i + 1,
        },
        {
          y: 0,
          opacity: 1,
          zIndex: i + 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: `top+=${i * 300} center`,
            end: `top+=${(i + 1) * 300} center`,
            scrub: true,
            scroller: "#main",
          },
        }
      );
    });
  
}


  locomotive();

  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
       ./frame_00004.webp
       ./frame_00005.webp
       ./frame_00006.webp
       ./frame_00007.webp
       ./frame_00008.webp
       ./frame_00009.webp
       ./frame_00010.webp
       ./frame_00011.webp
       ./frame_00012.webp
       ./frame_00013.webp
       ./frame_00014.webp
       ./frame_00015.webp
       ./frame_00016.webp
       ./frame_00017.webp
       ./frame_00018.webp
       ./frame_00019.webp
       ./frame_00020.webp
       ./frame_00021.webp
       ./frame_00022.webp
       ./frame_00023.webp
       ./frame_00024.webp
       ./frame_00025.webp
       ./frame_00026.webp
       ./frame_00027.webp
       ./frame_00028.webp
       ./frame_00029.webp
       ./frame_00030.webp
       ./frame_00031.webp
       ./frame_00032.webp
       ./frame_00033.webp
       ./frame_00034.webp
       ./frame_00035.webp
       ./frame_00036.webp
       ./frame_00037.webp
       ./frame_00038.webp
       ./frame_00039.webp
       ./frame_00040.webp
       ./frame_00041.webp
       ./frame_00042.webp
       ./frame_00043.webp
       ./frame_00044.webp
       ./frame_00045.webp
       ./frame_00046.webp
       ./frame_00047.webp
       ./frame_00048.webp
       ./frame_00049.webp
       ./frame_00050.webp
       ./frame_00051.webp
       ./frame_00052.webp
       ./frame_00053.webp
       ./frame_00054.webp
       ./frame_00055.webp
       ./frame_00056.webp
       ./frame_00057.webp
   `;
    // return data.trim().split("\n")[index].trim();
    return`./frames/` + data.trim().split("\n")[index].trim();
  }

  const frameCount = 54;
  const images = [];
  const imageSeq = { frame: 4 };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 1,
      trigger: "#page>canvas",
      start: "top top",
      end: "500% top",
      scroller: "#main",
    },
    onUpdate: render,
  });

  images[4].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }

  
