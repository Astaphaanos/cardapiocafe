async function loadComponents() {
  try {
    const navbar = await fetch("../components/header.html").then(r => r.text());
    document.getElementById("navbar").innerHTML = navbar;

    const sidebar = await fetch("../components/sidebar.html").then(r => r.text());
    document.getElementById("sidebar").innerHTML = sidebar;

    lucide.createIcons();

  } catch (error) {
    console.error("Erro ao carregar componentes:", error);
  }
}

loadComponents();