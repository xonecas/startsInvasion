
!function (window) {

   var scene, camera, renderer, particle, mousex, mousey, 
      count     = 0,
      particles = [],
      width     = window.innerWidth,
      height    = window.innerHeight,
      sep       = 150,
      amountx   = 50,
      amounty   = 50;

   $.domReady(function () {

      scene = new THREE.Scene();


      camera = new THREE.Camera(75, width / height, 1, 10000);
      camera.position.z = 1000;
      camera.position.y = 400;
      camera.position.x = 1000;

      var material =  new THREE.ParticleCanvasMaterial({
         color: 0xffffff,
         program: function (ctx) {
            ctx.beginPath();
            ctx.moveTo(0, -15);
            ctx.lineTo(60, -15); // right
            ctx.lineTo(0, -60); // left bottom
            ctx.lineTo(30, -0); // top
            ctx.lineTo(60, -60); // right bottom
            ctx.lineTo(0, -15);
            ctx.fill();
         }
      });

      var i = 0;
      particles = [];
      for (var ix = 0; ix < amountx; ix++) {
         for (var iy = 0; iy < amounty; iy++) {
            particle = particles[i++] = new THREE.Particle(material);
            particle.position.x = ix * sep - ((amountx * sep) / 2);
            particle.position.z = iy * sep - ((amounty * sep) / 2);
            
            scene.addObject(particle);
         }
      }


      renderer = new THREE.CanvasRenderer();
      renderer.setSize(width -30, height -30);
      $('body').append(renderer.domElement);

      render();

      $(document).bind('mousemove', move);
      $(document).bind('click', function (ev) {
         console.log(camera);
      });
   });

   function move (ev) {
      mousex = ev.clientX - width / 2;
      mousey = ev.clientY - height / 2;
   }


   function render () {
      camera.position.x = mousex * 5 * -1;
      camera.position.y = mousey * 5 * -1;

      var i = 0;
      for (var ix = 0; ix < amountx; ix++) {
         for (var iy = 0; iy < amounty; iy++) {
            particle = particles[i++];
// taken from the example, I don't get this bit..
particle.position.y = ( Math.sin( ( ix + count ) * 0.3 ) * 100 ) + ( Math.sin( ( iy + count ) * 0.5 ) * 100 );
particle.scale.x = particle.scale.y = ( Math.sin( ( ix + count ) * 0.3 ) + 0.2 ) + ( Math.sin( ( iy + count ) * 0.5 ) + 0.2 );
               
         }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(render);
      count += 0.1;
   };


} (window, undefined);











