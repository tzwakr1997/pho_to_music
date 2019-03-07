function onFileSelected(input) {
  var file = input.files[0];
  var reader = new FileReader();

  reader.onload = onFileLoaded;
  reader.readAsDataURL(file);
}

function onFileLoaded(e) {
  var src_data = e.target.result;
  var img = new Image();

  img.onload = onImageSetted;
  img.src = src_data;
}

function onImageSetted(e) {
  var img_data = createImageData(e.target);

  document.getElementById('test_canvas').width = img_data.width;
  document.getElementById('test_canvas').height = img_data.height;
  document.getElementById('test_canvas').getContext('2d').putImageData(img_data, 0, 0);
  document.getElementById('test_canvas').img_data = img_data;
  // document.getElementById('test_canvas').addEventListener('click', processImageData);
}

function createImageData(img) {
  var cv = document.createElement('canvas');
  cv.width = img.naturalWidth;
  cv.height = img.naturalHeight;

  var ct = cv.getContext('2d');
  ct.drawImage(img, 0, 0);

  var data = ct.getImageData(0, 0, cv.width, cv.height);

  return data;
}

function processImageData(e) {
  var cv = document.getElementById('test_canvas');
  var img_data = cv.img_data;

  if (!img_data) {
    alert("aa");
  }

  var processed_data = cv.getContext('2d').createImageData(img_data.width, img_data.height);

  var r_sum = 0;
  var g_sum = 0;
  var b_sum = 0;

  for (var y = 1; y < img_data.height - 1; y++) {
    for (var x = 1; x < img_data.width - 1; x++) {
      var r = 0;
      var g = 0;
      var b = 0;

      for (var yy = y - 1; yy <= y + 1; yy++) {
        for (var xx = x - 1; xx <= x + 1; xx++) {
          var index = (xx + yy * img_data.width) * 4;
          r += img_data.data[index];
          g += img_data.data[index + 1];
          b += img_data.data[index + 2];
        }
      }

      var index = (x + y * img_data.width) * 4;
      r_sum += Math.floor(r / 9);
      g_sum += Math.floor(g / 9);
      b_sum += Math.floor(b / 9);
    }
  }

  var loop = (img_data.height - 2) * (img_data.width - 2);
  var r_final = Math.floor(r_sum / loop);
  var g_final = Math.floor(g_sum / loop);
  var b_final = Math.floor(b_sum / loop);
  console.log(r_final);
  console.log(g_final);
  console.log(b_final);

  var pink = Math.abs(255 - r_final) + Math.abs(192 - g_final) + Math.abs(203 - b_final);
  var blue = Math.abs(0 - r_final) + Math.abs(0 - g_final) + Math.abs(255 - b_final);
  var black = Math.abs(0 - r_final) + Math.abs(0 - g_final) + Math.abs(0 - b_final);
  var color = Math.min(pink, blue, black);

  if (color == pink) {
    console.log("pink");
    //黄色　喜び
    var movie = document.getElementById("movie");
    var ifr = document.createElement("div");
    var aTag = document.createElement("a");
    aTag.setAttribute("href", "https://www.youtube.com/watch?v=gmLXEmCExIE");
    aTag.innerHTML = "こちら";
    ifr.appendChild(aTag);
    ifr.innerHTML += "の曲がヒットしました。\n";
    movie.appendChild(ifr);
  } else if (color == blue) {
    //悲しみ　青
    var movie = document.getElementById("movie");
    var ifr = document.createElement("div");
    var aTag = document.createElement("a");
    aTag.setAttribute("href", "https://www.youtube.com/watch?v=erGCAu_hFqM");
    aTag.innerHTML = "こちら";
    ifr.appendChild(aTag);
    ifr.innerHTML += "の曲がヒットしました。\n";
    movie.appendChild(ifr);

  } else if (color == black) {
    //恐れ　黒
    var movie = document.getElementById("movie");
    var ifr = document.createElement("div");
    var aTag = document.createElement("a");
    aTag.setAttribute("href", "https://www.youtube.com/watch?v=IL35V9wYr-U");
    aTag.innerHTML = "こちら";
    ifr.appendChild(aTag);
    ifr.innerHTML += "の曲がヒットしました。\n";
    movie.appendChild(ifr);
  }

  movie.removeChild(movie.firstChild);
}
