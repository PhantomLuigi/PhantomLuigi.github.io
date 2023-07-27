var headerEl = document.getElementById("header_container")
var tooltipEl = document.getElementsByClassName("tooltip_body")[0]
var infoEl = document.getElementsByClassName("info_body")[0]
var bodyEl = document.body

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }


// page elements
var headerFunc = function() {
    var headerCont = '<div class="header"><span class="small_icon fs3" style="position:absolute;left:4px;top:4px;" title="FS3"></span>';
    for (var i in headerLinks["3"]) {headerCont += '\n<a href="' + headerLinks["3"][i][1] + '">' + getTranslatedString("headerlink."+headerLinks["3"][i][0]+".name") + '</a>'};
    headerCont += '</div><br /><div class="header"><span class="small_icon info_small" style="position:absolute;left:4px;top:4px;" title="' + getTranslatedString("headerlink.info_pages.name") + '"></span>';
    for (var j in headerLinks["i"]) {headerCont += '\n<a href="' + headerLinks["i"][j][1] + '">' + getTranslatedString("headerlink."+headerLinks["i"][j][0]+".name") + '</a>'};
    headerCont += "</div>";
    headerEl.innerHTML = headerCont;
};


var tooltipCont = '<h3 class="tooltip_name">Item Name</h3><br /><p class="tooltip_cat1">Categories: </p><p class="tooltip_cat2">Placeholder</p><br /><br /><p class="tooltip_desc">Item description. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><br /><p class="tooltip_bonus">+1 Place Holding</p><p class="tooltip_src1">Source: </p><p class="tooltip_src2">Item source</p><span class="tooltip_price_cont"><br /><p class="tooltip_price1">Sell Price: </p><p class="tooltip_price2">$0 C0 0¢</p></span>'
tooltipEl.innerHTML = tooltipCont

var infoCont = '<h3 class="info_name">Info Topic</h3><br /><p class="info_desc">This is the description of an info topic. Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>'
infoEl.innerHTML = infoCont

// function to make item elements
var makeItem = function(id, dv, stack, nbt, donoequip) {
    if (equiplist[id] == undefined) {throw Error("Invalid item ID: "+id)};
    if ((dv != 0) && (equiplist[id].length == 1)) {throw Error("Item with ID " +id +" has no DVs, but " +dv+ " was passed")}
    else if (equiplist[id][dv] == undefined) {throw Error("Invalid item ID/DV pair: "+id+"/"+dv)};
    var didFirstArg = false;
    var didSecondArg = false;
    var didThirdArg = false;
    var startedMini = false;
    var invenRow2 = "<span class='icon ";
    if ("enchant" in nbt) {invenRow2 += "enchanted "}
    invenRow2 += equiplist[id][dv][1];
    if (("bools" in nbt) && (nbt["bools"][0] == true)) {invenRow2 += " dbg"}
    if (donoequip) {invenRow2 += "' onmouseover='tt(";}
    else {invenRow2 += "' onmouseover='ttEquip(";}
    invenRow2 += id + "," + dv;
    for (k in nbt) { // check for first argument data (enchants)
        if (k == "enchant") {
            if (!didFirstArg) {invenRow2 += ",\""}
            else {invenRow2 += "<br />"}
            didFirstArg = true
            invenRow2 += enchantlist[nbt["enchant"][0]][0] + " " + nbt["enchant"][1]
        }
        else if (k == "potion_eff") {
            if (!didFirstArg) {invenRow2 += ",\""}
            else {invenRow2 += "<br />"}
            didFirstArg = true
            invenRow2 += getTranslatedString(effectlist[nbt["potion_eff"][0]][0]) + " (" + nbt["potion_eff"][1] + " turn"
            if (nbt["potion_eff"][1] == 1) {} else {invenRow2 += "s"}
            invenRow2 += ")"
        }
    }
    if (didFirstArg) {invenRow2 += "\""}
    else {invenRow2 += ",\"\""}
    for (k in nbt) { // check for second argument data (description appends)
        if (k == "desc_append") {
            if (!didSecondArg) {invenRow2 += ",\""}
            didSecondArg = true
            invenRow2 += nbt["desc_append"][0]
        }
    }
    if (didSecondArg) {invenRow2 += "\""}
    else {invenRow2 += ",\"\""}
    for (k in nbt) { // check for third argument data (custom name)
        if (k == "cname") {
            if (!didThirdArg) {invenRow2 += ",\""}
            didThirdArg = true
            invenRow2 += nbt["cname"]
        }
    }
    if (didThirdArg) {invenRow2 += "\""}
    else {invenRow2 += ",\"\""}
    invenRow2 += ");' onmouseout='nt();'>"
    invenRow2 += "</span>";
    for (k in nbt) { // check for mini icons (tags)
        if (k == "tag") {
            if (!startedMini) {invenRow2 += "<span class='mini_cont'>"}
            startedMini = true
            invenRow2 += "<span class='mini_icon mini_tag_" + nbt["tag"] + "'></span>"
        }
    }
    for (m of equiplist[id][dv][1].split(" ")) { // check for mini icons (classes)
        if (m == "enchanted") {
            if (!startedMini) {invenRow2 += "<span class='mini_cont'>"}
            startedMini = true
            invenRow2 += "<span class='mini_icon mini_ench'></span>"
        } else if (m == "golden") {
            if (!startedMini) {invenRow2 += "<span class='mini_cont'>"}
            startedMini = true
            invenRow2 += "<span class='mini_icon mini_golden'></span>"
        } else if (m == "ripe") {
            if (!startedMini) {invenRow2 += "<span class='mini_cont'>"}
            startedMini = true
            invenRow2 += "<span class='mini_icon mini_ripe'></span>"
        }
    }
    if (startedMini) {invenRow2 += "</span>"}
    return invenRow2
}

