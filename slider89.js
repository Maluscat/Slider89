function Slider89(target, values = {}) {
  //Define the attributes of the object instance
  this.absWidth = values.absWidth != null ? values.absWidth : slider89.absWidth;
  this.min = values.min != null ? values.min : slider89.min;
  this.max = values.max != null ? values.max : slider89.max;
  this.value = values.value != null ? values.value : slider89.value;
  this.comma = values.comma != null ? values.comma : slider89.comma;
  this.width = this.computeWidth(values) || this.computeWidth(slider89)
  this.caption = values.caption || slider89.caption;
  this.trimComma = values.trimComma != null ? values.trimComma : slider89.trimComma;
  this.tipDuration = values.tipDuration != null ? values.tipDuration : slider89.tipDuration;
  this.classList = values.classList || slider89.classList;
  if (this.width == 'auto') {
    this.width
  }
  if (values.task) {
    this.setTask(this, values.task);
  } else if (slider89.task) {
    this.task = slider89.task;
  }

  this.taskLock = false;
  this.tipTimer;

  //Call buildElement parsing the target (element for the slider to be created in / to be replaced with) to build the slider
  this.element = this.buildElement(target, values.replaceNode != null ? values.replaceNode : slider89.replaceNode);

  //Write 'this' into a carrier-variable and attach the needed event listeners
  let obj = this
  this.element.children[0].addEventListener('mousedown', function(e) {
    document.body.classList.add('noselect');
    obj.executeSlider(e.x);
    window.addEventListener('mousemove', obj.mouseMove);
  });
  //On mouse up, removet the mouse move listener which was added on mouse down
  window.addEventListener('mouseup', function() {
    document.body.classList.remove('noselect');
    window.removeEventListener('mousemove', obj.mouseMove);
  });
  //The function executed by the mousemove listener. Needs to be here in order to reach 'obj'
  this.mouseMove = function(e) {
    obj.executeSlider(e.x)
  }
}

Slider89.prototype.computeWidth = function(method) {
  return method.width == 'auto' ? this.max - this.min + 14 : method.width + 14 * !this.absWidth;
}

Slider89.prototype.setTask = function(target, task) {
  if (typeof task == 'function') {
    target.task = task;
  } else if (typeof task != 'function') {
    console.error('Slider89 error: specified task \'' + task + '\' is not a function.\nContinuing without a task.');
  }
}

Slider89.prototype.newValues = function(newValues = {}) {
  this.absWidth = newValues.absWidth != null ? newValues.absWidth : this.absWidth;
  this.value = newValues.value ? newValues.value : ((newValues.max || this.max) - (newValues.min || this.min)) * this.value / (this.max - this.min) || this.value;
  this.min = newValues.min || this.min;
  this.max = newValues.max || this.max;
  this.comma = newValues.comma || this.comma;
  this.width = this.computeWidth(newValues) || this.width;
  if (newValues.caption) {
    this.caption = newValues.caption;
    this.element.children[1].innerHTML = this.caption;
  }
  this.trimComma = newValues.trimComma != null ? newValues.trimComma : this.trimComma;
  this.tipDuration = newValues.tipDuration != null ? newValues.tipDuration : this.tipDuration;
  if (newValues.classList) {
    this.classList = newValues.classList;
    for (var i = 0; i < this.classList.length; i++) {
      this.element.classList.add(this.classList[i]);
    }
  }
  if (newValues.task) {
    this.setTask(newValues.task);
  }

  if (newValues.width && newValues.width != 'auto') {
    this.element.children[0].style.width = this.width + 'px';
  }
}

//Build the slider inside the specified target element and return it as element
Slider89.prototype.buildElement = function(target, replace) {
  let node = document.createElement('div');
  node.classList.add('slider89');
  node.innerHTML = `
    <div class="slider" style="width: ${this.width}px">
      <span class="slider_knob" style="transform: translateX(${(this.width - 14) * (this.value - this.min) / (this.max - this.min)}px)"></span>
      <span class="slider_tooltip right hidden noselect">${this.value}</span>
    </div>
    <span class="slider_header">${this.caption}</span>
  `;
  for (var i = 0; i < this.classList.length; i++) {
    node.classList.add(this.classList[i]);
  }
  if (replace) {
    target.parentNode.replaceChild(node, target);
  } else {
    target.appendChild(node);
  }
  return node;
}

Slider89.prototype.executeSlider = function(clickedX) {
  let node = this.element.children[0];
  let rect = node.getBoundingClientRect();
  let tip = node.children[1];
  let finalValue;
  let distance = clickedX - rect.left - 7;
  if (distance < 0) {
    distance = 0;
  } else if (distance > rect.width - 14) {
    distance = rect.width - 14;
  }
  distance = Math.round(distance);
  //set the value tooltip; if nothing has happened for the time the user has defined (default 250ms), hide it
  clearTimeout(this.tipTimer);
  tip.classList.remove('hidden');
  this.tipTimer = setTimeout(function() {
    tip.classList.add('hidden');
  }, this.tipDuration);
  //translate the slider knob
  node.children[0].style.transform = 'translateX(' + distance + 'px)';
  //compute the final value
  finalValue = (this.max - this.min) * distance / (rect.width - 14) + this.min;
  //limit the amount of figures after comma accordingly to the value
  if (this.trimComma) {
    finalValue = Number(finalValue.toFixed(this.comma));
    tip.innerHTML = finalValue;
  } else {
    finalValue = finalValue.toFixed(this.comma);
    tip.innerHTML = finalValue;
    finalValue = Number(finalValue);
  }
  //If nothing has changed, stop
  if (this.value == finalValue) {
    if (!this.taskLock && this.task != null) {
      (this.task)();
      this.taskLock = true;
    }
    return;
  }
  this.taskLock = false;
  if (this.task != null) {
    (this.task)();
  }
  //Update value
  this.value = finalValue;
  //Change the positioning of the tooltip accordingly to the position of the slider knob
  if (distance >= rect.width - tip.clientWidth - 14 && tip.classList.contains('right') || distance <= tip.clientWidth && tip.classList.contains('left')) {
    tip.classList.toggle('right');
    tip.classList.toggle('left');
  }
}

var slider89 = {
  absWidth: false,
  min: 0,
  max: 100,
  value: 0,
  comma: 0,
  width: 'auto',
  caption: '',
  trimComma: true,
  tipDuration: 250,
  classList: [],
  replaceNode: false,
  defaultValues: function(defValues) {
    if (defValues.absWidth != null) this.absWidth = defValues.absWidth;
    if (defValues.min != null) this.min = defValues.min;
    if (defValues.max != null) this.max = defValues.max;
    if (defValues.value != null) this.value = defValues.value;
    if (defValues.comma != null) this.comma = defValues.comma;
    if (defValues.width != null) this.width = defValues.width;
    if (defValues.caption) this.caption = defValues.caption;
    if (defValues.trimComma != null) this.trimComma = defValues.trimComma;
    if (defValues.tipDuration != null) this.tipDuration = defValues.tipDuration;
    if (defValues.classList) this.classList = defValues.classList;
    if (defValues.replaceNode != null) this.replaceNode = defValues.replaceNode;
    if (defValues.task) Slider89.prototype.setTask(this, defValues.task);
  }
}
