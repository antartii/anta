const data_url = 'https://antarti.fr/data.json';

function set_inner_html(html_element, inner_html)
{
    html_element.innerHTML = inner_html;
    return 0;
}

async function fetch_data(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error from the network response");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Got an error while fetching: ", error);
        return null;
    }
  }

async function set_translation(language) {
    const about_me_HTML = document.getElementById("about_me");
    const name_HTML = about_me_HTML.getElementsByClassName("name")[0];
    const sub_description_HTML = about_me_HTML.getElementsByClassName("sub_description")[0];
    const description_HTML = about_me_HTML.getElementsByClassName("description")[0];

    const data = await fetch_data(data_url);
    let data_language = data.text.en
    let data_about_me = data_language["about me"];

    if (language == "fr") {
        data_language = data.text.fr;
        data_about_me = data_language["about me"];
    }
    name_HTML.innerHTML = data_about_me.name;
    sub_description_HTML.innerHTML = data_about_me["sub description"];
    description_HTML.innerHTML = data_about_me.description;
};

function toggle_translate(translate_button_HTML)
{
    const language = translate_button_HTML.getAttribute("language");

    if (language == "en") {
        set_translation("fr");
        translate_button_HTML.setAttribute("language", "fr");
        translate_button_HTML.innerHTML = "fr";
        translate_button_HTML.style.textAlign = "right";
    }
    else if (language == "fr") {
        set_translation("en");
        translate_button_HTML.setAttribute("language", "en");
        translate_button_HTML.innerHTML = "en";
        translate_button_HTML.style.textAlign = "left";
    }
}

const translate_button_HTML = document.getElementById("translate");

translate_button_HTML.addEventListener('click', function() {
    let translate_button_HTML = document.getElementById("translate");

    toggle_translate(translate_button_HTML);
});
