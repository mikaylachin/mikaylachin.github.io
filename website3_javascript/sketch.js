// P_2_3_1_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * draw tool. draw with a rotating line.
 *
 * MOUSE
 * drag                : draw
 *
 * KEYS
 * 1-4                 : switch default colors
 * delete/backspace    : clear screen
 * d                   : reverse direction and mirrow angle
 * space               : new random color
 * arrow left          : rotaion speed -
 * arrow right         : rotaion speed +
 * arrow up            : line length +
 * arrow down          : line length -
 * s                   : save png
 */
'use strict';

var c;
var lineLength = 0;
var angle = 0;
var angleSpeed = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  cursor(CROSS);
  strokeWeight(1);

  c = color("#CD5C5C");
}

function draw() {
  if (mouseIsPressed && mouseButton == LEFT) {
    push();
    translate(mouseX, mouseY);
    rotate(radians(angle));
    stroke(c);
    line(0, 0, lineLength, 0);
    pop();

    angle += angleSpeed;
  }
}

function mousePressed() {
  // create a new random line length each new press
  lineLength = random(70, 200);
}

function keyPressed() {
  if (keyCode == UP_ARROW) lineLength += 5;
  if (keyCode == DOWN_ARROW) lineLength -= 5;
  if (keyCode == LEFT_ARROW) angleSpeed -= 0.5;
  if (keyCode == RIGHT_ARROW) angleSpeed += 0.5;
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
  if (keyCode == DELETE || keyCode == BACKSPACE) background(255);

  // reverse direction and mirror angle
  if (key == 'd' || key == 'D') {
    angle += 180;
    angleSpeed *= -1;
  }

  // change color
  if (key == ' ') c = color(random(255), random(255), random(255), random(80, 100));
  // default colors from 1 to 4
  if (key == '1') c = color("#CD5C5C");
  if (key == '2') c = color("#FF6347");
  if (key == '3') c = color("#DC143C");
  if (key == '4') c = color("#EAF2F4");
  if (key == '5') c = color("#202020");
}
