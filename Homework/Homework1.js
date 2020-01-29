let robot = lib220.loadImageFromURL('https://people.cs.umass.edu/~joydeepb/robot.jpg');

//display pictures
/*
robot.show();
makeGrayscale(robot);
removeBlueAndGreen(robot);
mapToRed(robot);
mapToGrayscale(robot);
highlightEdges(robot);
blur(robot);*/

//function definitions

function makeGrayscale(img){
  let imgCpy = img.copy();
  for (let w = 0; w < imgCpy.width; ++w) {
    for(let h = 0; h < imgCpy.height ; ++h){
      let curPixel = imgCpy.getPixel(w,h);
      let mean = (curPixel[0]+curPixel[1]+curPixel[2])/3;
      let modPixel = [mean,mean,mean];
      imgCpy.setPixel(w,h,modPixel);
    }
  }
  imgCpy.show()
  return imgCpy;
}

function removeBlueAndGreen(img){
  let imgCpy = img.copy();
  for (let w = 0; w < imgCpy.width; ++w) {
    for(let h = 0; h < imgCpy.height ; ++h){
      let curPixel = imgCpy.getPixel(w,h);
      let modPixel = [curPixel[0],0.0,0.0];
      imgCpy.setPixel(w,h,modPixel);
    }
  }
  imgCpy.show()
  return imgCpy;
}

function mapToRed(img){
  return imageMap(img,helperRed);
}
function mapToGrayscale(img){
  return imageMap(img, helperGrayscale);
}

function helperGrayscale(pixel){
  let mean = (pixel[0]+pixel[1]+pixel[2])/3;
  return [mean,mean,mean];
}

function helperRed(pixel){
  return [pixel[0],0.0,0.0];
}

function imageMap(img, func){
  let imgCpy = img.copy();
    for (let w = 0; w < imgCpy.width; ++w) {
      for(let h = 0; h < imgCpy.height ; ++h){
        let curPixel = imgCpy.getPixel(w,h);
        let modPixel = func(curPixel);
        imgCpy.setPixel(w,h,modPixel);
      }
    }
  imgCpy.show()
  return imgCpy;
}

function highlightEdges(img){
  let imgCpy = img.copy();
    for (let w = 0; w < imgCpy.width-1 ; ++w) {
      for(let h = 0; h < imgCpy.height ; ++h){
        let curPixel = imgCpy.getPixel(w,h);
        let nextPixel = imgCpy.getPixel(w+1,h);
        let curMean = (curPixel[0]+curPixel[1]+curPixel[2])/3;
        let nextMean = (nextPixel[0]+nextPixel[1]+nextPixel[2])/3;
        let finMean = Math.abs(curMean-nextMean);
        let finPixel = [finMean,finMean,finMean];
        imgCpy.setPixel(w,h,finPixel);
        if(w===imgCpy.width-2){
          imgCpy.setPixel(w+1,h,finPixel);
        }
      }
    }
  imgCpy.show()
  return imgCpy;
}

function blur(img){
  
    let imgCpy = img.copy();
    for (let w = 1; w < imgCpy.width-1 ; ++w) {
      for(let h = 1; h < imgCpy.height-1 ; ++h){
        let pixel0 = imgCpy.getPixel(w,h);
        let pixel1 = imgCpy.getPixel(w+1,h);
        let pixel2 = imgCpy.getPixel(w-1,h);
        let pixel3 = imgCpy.getPixel(w,h+1);
        let pixel4 = imgCpy.getPixel(w,h-1);
        let pixel5 = imgCpy.getPixel(w+1,h+1);
        let pixel6 = imgCpy.getPixel(w+1,h-1);
        let pixel7 = imgCpy.getPixel(w-1,h+1);
        let pixel8 = imgCpy.getPixel(w-1,h-1);


        let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0]+pixel4[0]+pixel5[0]+pixel6[0]+pixel7[0]+pixel8[0])/9;
        let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1]+pixel4[1]+pixel5[1]+pixel6[1]+pixel7[1]+pixel8[1])/9;
        let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2]+pixel4[2]+pixel5[2]+pixel6[2]+pixel7[2]+pixel8[2])/9;

        let finPixel = [curRedMean,curGreenMean,curBlueMean];
        imgCpy.setPixel(w,h,finPixel);
      }
    }

    //Edge cases

    //left side
    for(let h = 1; h < imgCpy.height-1 ; ++h){
      let pixel0 = imgCpy.getPixel(0,h);
      let pixel1 = imgCpy.getPixel(1,h);
      let pixel2 = imgCpy.getPixel(0,h+1);
      let pixel3 = imgCpy.getPixel(0,h-1);
      let pixel4 = imgCpy.getPixel(1,h+1);
      let pixel5 = imgCpy.getPixel(1,h-1);

      let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0]+pixel4[0]+pixel5[0])/6;
      let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1]+pixel4[1]+pixel5[1])/6;
      let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2]+pixel4[2]+pixel5[2])/6;

      let finPixel = [curRedMean,curGreenMean,curBlueMean];
      imgCpy.setPixel(0,h,finPixel);
    }

    //right side
    for(let h = 1; h < imgCpy.height-1 ; ++h){

        let pixel0 = imgCpy.getPixel(imgCpy.width-1,h);
        let pixel1 = imgCpy.getPixel(imgCpy.width-2,h);
        let pixel2 = imgCpy.getPixel(imgCpy.width-1,h+1);
        let pixel3 = imgCpy.getPixel(imgCpy.width-1,h-1);
        let pixel4 = imgCpy.getPixel(imgCpy.width-2,h+1);
        let pixel5 = imgCpy.getPixel(imgCpy.width-2,h-1);


        let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0]+pixel4[0]+pixel5[0])/6;
        let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1]+pixel4[1]+pixel5[1])/6;
        let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2]+pixel4[2]+pixel5[2])/6;

        let finPixel = [curRedMean,curGreenMean,curBlueMean];
        imgCpy.setPixel(imgCpy.width-1,h,finPixel);
    }

    //Top side
        
    for(let w = 1; w < imgCpy.width-1 ; ++w){

        let pixel0 = imgCpy.getPixel(w,0);
        let pixel1 = imgCpy.getPixel(w+1,0);
        let pixel2 = imgCpy.getPixel(w-1,0);
        let pixel3 = imgCpy.getPixel(w,1);
        let pixel4 = imgCpy.getPixel(w+1,1);
        let pixel5 = imgCpy.getPixel(w-1,1);


        let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0]+pixel4[0]+pixel5[0])/6;
        let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1]+pixel4[1]+pixel5[1])/6;
        let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2]+pixel4[2]+pixel5[2])/6;

        let finPixel = [curRedMean,curGreenMean,curBlueMean];
        imgCpy.setPixel(w,0,finPixel);
    }

    //Bottom side

        for(let w = 1; w < imgCpy.width-1 ; ++w){

        let pixel0 = imgCpy.getPixel(w,imgCpy.height-1);
        let pixel1 = imgCpy.getPixel(w+1,imgCpy.height-1);
        let pixel2 = imgCpy.getPixel(w-1,imgCpy.height-1);
        let pixel3 = imgCpy.getPixel(w,imgCpy.height-2);
        let pixel4 = imgCpy.getPixel(w+1,imgCpy.height-2);
        let pixel5 = imgCpy.getPixel(w-1,imgCpy.height-2);


        let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0]+pixel4[0]+pixel5[0])/6;
        let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1]+pixel4[1]+pixel5[1])/6;
        let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2]+pixel4[2]+pixel5[2])/6;

        let finPixel = [curRedMean,curGreenMean,curBlueMean];
        imgCpy.setPixel(w,imgCpy.height-1,finPixel);
    }

    //Corners

    //Top Left
    while(1===1){
      let pixel0 = imgCpy.getPixel(0,0);
      let pixel1 = imgCpy.getPixel(0,1);
      let pixel2 = imgCpy.getPixel(1,0);
      let pixel3 = imgCpy.getPixel(1,1);

      let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0])/4;
      let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1])/4;
      let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2])/4;

      let finPixel = [curRedMean,curGreenMean,curBlueMean];
      imgCpy.setPixel(0,0,finPixel);
      break;
    }
    //Top Right
    while(1===1){
      let pixel0 = imgCpy.getPixel(imgCpy.width-1,0);
      let pixel1 = imgCpy.getPixel(imgCpy.width-1,1);
      let pixel2 = imgCpy.getPixel(imgCpy.width-2,0);
      let pixel3 = imgCpy.getPixel(imgCpy.width-2,1);

      let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0])/4;
      let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1])/4;
      let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2])/4;

      let finPixel = [curRedMean,curGreenMean,curBlueMean];
      imgCpy.setPixel(imgCpy.width-1,0,finPixel);
      break;
    }
    //Bottom Left
    while(1===1){
      let pixel0 = imgCpy.getPixel(0,imgCpy.height-1);
      let pixel1 = imgCpy.getPixel(0,imgCpy.height-2);
      let pixel2 = imgCpy.getPixel(1,imgCpy.height-1);
      let pixel3 = imgCpy.getPixel(1,imgCpy.height-2);

      let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0])/4;
      let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1])/4;
      let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2])/4;

      let finPixel = [curRedMean,curGreenMean,curBlueMean];
      imgCpy.setPixel(0,imgCpy.height-1,finPixel);
      break;
    }
    //Bottom Right
      while(1===1){
      let pixel0 = imgCpy.getPixel(imgCpy.width-1,imgCpy.height-1);
      let pixel1 = imgCpy.getPixel(imgCpy.width-1,imgCpy.height-2);
      let pixel2 = imgCpy.getPixel(imgCpy.width-2,imgCpy.height-1);
      let pixel3 = imgCpy.getPixel(imgCpy.width-1,imgCpy.height-2);

      let curRedMean = (pixel0[0]+pixel1[0]+pixel2[0]+pixel3[0])/4;
      let curGreenMean = (pixel0[1]+pixel1[1]+pixel2[1]+pixel3[1])/4;
      let curBlueMean = (pixel0[2]+pixel1[2]+pixel2[2]+pixel3[2])/4;

      let finPixel = [curRedMean,curGreenMean,curBlueMean];
      imgCpy.setPixel(imgCpy.width-1,imgCpy.height-1,finPixel);
      break;
    }

  imgCpy.show()
  return imgCpy;
}


function pixelEq (p1, p2) {
  const epsilon = 0.002;
  for (let i = 0; i < 3; ++i) {
    if (Math.abs(p1[i] - p2[i]) > epsilon) {
      return false;
    }
  }
  return true;
};

//Test Functions

test('Check pixel equality', function() {
  const inputPixel = [0.5, 0.5, 0.5]
  // Create a test image, of size 10 pixels x 10 pixels, and set it to the inputPixel
  const image = lib220.createImage(10, 10, inputPixel);
  // Process the image.
  const outputImage = removeBlueAndGreen(image);
  // Check the center pixel.
  const centerPixel = outputImage.getPixel(5, 5);
  assert(pixelEq(centerPixel, [0.5, 0, 0]));
  // Check the top-left corner pixel.
  const cornerPixel = outputImage.getPixel(0, 0);
  assert(pixelEq(cornerPixel, [0.5, 0, 0]));
});

test('removeBlueAndGreen function definition is correct', function() {
  const white = lib220.createImage(10, 10, [1,1,1]);
  removeBlueAndGreen(white).getPixel(0,0);
  // Need to use assert
});

test('No blue or green in removeBlueAndGreen result', function() {
  // Create a test image, of size 10 pixels x 10 pixels, and set it to all white.
  const white = lib220.createImage(10, 10, [1,1,1]);
  // Get the result of the function.
  const shouldBeRed = removeBlueAndGreen(white);
  // Read the center pixel.
  const pixelValue = shouldBeRed.getPixel(5, 5);
  // The red channel should be unchanged.
  assert(pixelValue[0] === 1);
  // The green channel should be 0.
  assert(pixelValue[1] === 0);
  // The blue channel should be 0.
  assert(pixelValue[2] === 0);
});