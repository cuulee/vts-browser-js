/**
 * @constructor
 */
Melown.UIControlLink = function(ui_, visible_) {
    this.ui_ = ui_;
    this.browser_ = ui_.browser_;
    this.control_ = this.ui_.addControl("zoom",
      '<div id="melown-link" class="melown-link">'

        + '<div id="melown-link-button" class="melown-link-button">'
          + '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAABrUlEQVRIx+2VMWtUQRSFz5nZjVrpD9gNVhpLQbZZ5vWaIoUECayNRSpbo9UiJI1pBRs7DVjYGBC1ntm3yHaiwgYsZP+EmMe7x8K3YJEH+xYLwT3NcGe483HvnJkBVvovxWWSsiy7BeAxgGuSpmY2zPP8/V+DhBAekDysQgPgAMDMbo5Gow9n5bgmgF6vd47kAYBC0t0Y45qkPQAguV+X1wgymUx+ShqUZZmllI4AlEVRPJckkht1ea1FNu/3+1ve+31JV0h+dc49mq+12+0dkpQ0XfpMQgh7JJ9U4SmANf3WZUnXvfevAbQBbMYY3zVu1x+Awsx2YoznzewOgKcke3OApId1AADwCwIGJG90u12f5/nx+vr6Jefc0RyQUjpsfE9CCJsk3wIoyrLcljRttVrznv8AcAEAFgHUtovksNrkXp7nx+Px+ETSbQBfKrN8NrOtRQC17pK0QbJMKb2az5nZd+fc/ZRSBKAm1q+r5ASADyHsVuPAe/+R5JtlnqEzIWY2rGDPsiw7JfmysulB0ypq3TWbzb51Op0JyaskLwL4BGA3xvhi9aes9G/pF4AdwlhUZ8RfAAAAAElFTkSuQmCC">'
        + '</div>'

        + '<div id="melown-link-text-holder" class="melown-link-text-holder">'
            + '<div class="melown-link-text">'
              + '<input id="melown-link-text-input" type="text" readonly>'
            + '</div>'
        + '</div>'
        
     + ' </div>', visible_);
     
    var button_ = this.control_.getElement("melown-link-button");
    button_.on("click", this.onSwitch.bind(this));

    this.linkPanel_ = this.control_.getElement("melown-link-text-holder");
    this.link_ = this.control_.getElement("melown-link-text-input");

    this.linkVisible_ = false;
    this.update();
};

Melown.UIControlLink.prototype.onSwitch = function() {
    this.linkVisible_ = !this.linkVisible_;
    this.updateLink();
    this.update();
};

Melown.UIControlLink.prototype.update = function() {
    this.linkPanel_.setStyle("display", this.linkVisible_ ? "block" : "none");
};

Melown.UIControlLink.prototype.updateLink = function() {
    var map_ = this.browser_.getMap();
    if (!map_  || !this.linkVisible_) {
        return;
    }

    var p = map_.getPosition();
    var s = "";
    s += map_.getPositionViewMode(p) + ",";
    var c = map_.getPositionCoords(p);
    s += c[0] + "," + c[1] + "," + map_.getPositionHeightMode(p) + "," + c[2].toFixed(2) + ",";
    var o = map_.getPositionOrientation(p);
    s += o[0].toFixed(2) + "," + o[1].toFixed(2) + "," + o[2].toFixed(2) + ",";
    s += map_.getPositionViewExtent(p).toFixed(2) + "," + map_.getPositionFov(p).toFixed(2);
    
    var linkValue_ =  window.location.href + "?pos=" + s;

    if (this.link_.getElement().value != linkValue_) {
        this.link_.getElement().value = linkValue_;
    }
};

