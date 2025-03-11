const texturasMinecraft = [
  "acacia_planks", "andesite", "bedrock", "birch_planks", "blackstone", 
  "blue_concrete", "blue_concrete_powder", "bricks", "brown_concrete", 
  "brown_concrete_powder", "cobblestone", "crafting_table", "crimson_nylium", 
  "crimson_planks", "dark_oak_planks", "dark_prismarine", "diorite", "dirt", 
  "end_stone_bricks", "granite", "gray_concrete", "gray_concrete_powder", 
  "green_concrete", "green_concrete_powder", "jungle_planks", "light_blue_concrete", 
  "light_blue_concrete_powder", "light_gray_concrete", "light_gray_concrete_powder", 
  "lime_concrete", "lime_concrete_powder", "magenta_concrete", "magenta_concrete_powder", 
  "nether_bricks", "nether_wart_block", "oak_planks", "orange_concrete", 
  "orange_concrete_powder", "pink_concrete", "pink_concrete_powder", "polished_andesite", 
  "polished_diorite", "polished_granite", "prismarine_bricks", "purple_concrete", 
  "purple_concrete_powder", "quartz_block", "red_concrete", "red_concrete_powder", 
  "red_nether_bricks", "sandstone", "smooth_red_sandstone", "smooth_sandstone", 
  "spruce_planks", "stone_bricks", "terracotta", "warped_planks", "white_concrete", 
  "white_concrete_powder", "yellow_concrete", "yellow_concrete_powder", "acacia_log", 
  "birch_log", "clay", "coal_ore", "diamond_ore", "dirt_path", "end_stone", 
  "grass_block", "gravel", "ice", "iron_ore", "jungle_log", "lapis_ore", "oak_log", 
  "obsidian", "red_sand", "sand", "snow_block", "spruce_log", "warped_wart_block", 
  "anvil", "barrel", "blast_furnace", "brewing_stand", "cartography_table", "chest", 
  "chipped_anvil", "command_block", "composter", "dispenser", "dropper", 
  "enchanting_table", "fletching_table", "furnace", "grindstone", "hopper", 
  "iron_door", "iron_trapdoor", "jukebox", "lectern", "loom", "note_block", 
  "oak_door", "redstone_block", "scaffolding", "smithing_table", "smoker", 
  "stonecutter", "trapped_chest", "warped_door", "water", "acacia_leaves", 
  "azalea_leaves", "birch_leaves", "blue_orchid", "brown_mushroom", "carved_pumpkin", 
  "cornflower", "dandelion", "dark_oak_leaves", "dead_bush", "fern", "glass", 
  "glowstone", "jungle_leaves", "lily_pad", "oak_leaves", "poppy", "red_mushroom", 
  "rose_bush", "spruce_leaves", "sunflower", "torch", "warped_fungus", "white_tulip", 
  "wither_rose", "air", "barrier", "fire", "lava", "moving_piston", "piston", 
  "piston_head", "sticky_piston", "structure_block", "void_air"
];

// Legacy texture mapping (pre-1.19)
const legacyTextureMapping = {
  "acacia_planks": "planks_acacia",
  "andesite": "stone_andesite",
  "birch_planks": "planks_birch",
  "cobblestone": "cobblestone",
  "crafting_table": "crafting_table_top",
  "dark_oak_planks": "planks_big_oak",
  "diorite": "stone_diorite",
  "dirt": "dirt",
  "granite": "stone_granite",
  "jungle_planks": "planks_jungle",
  "oak_planks": "planks_oak",
  "polished_andesite": "stone_andesite_smooth",
  "polished_diorite": "stone_diorite_smooth",
  "polished_granite": "stone_granite_smooth",
  "spruce_planks": "planks_spruce",
  "stone_bricks": "stonebrick",
  "terracotta": "hardened_clay",
  "acacia_log": "log_acacia",
  "birch_log": "log_birch",
  "clay": "clay",
  "coal_ore": "coal_ore",
  "diamond_ore": "diamond_ore",
  "grass_block": "grass_top",
  "gravel": "gravel",
  "ice": "ice",
  "iron_ore": "iron_ore",
  "jungle_log": "log_jungle",
  "lapis_ore": "lapis_ore",
  "oak_log": "log_oak",
  "obsidian": "obsidian",
  "red_sand": "red_sand",
  "sand": "sand",
  "snow_block": "snow",
  "spruce_log": "log_spruce",
  "anvil": "anvil_top",
  "barrel": "barrel_top",
  "chest": "chest_top",
  "dispenser": "dispenser_front",
  "dropper": "dropper_front",
  "furnace": "furnace_top",
  "hopper": "hopper_top",
  "jukebox": "jukebox_top",
  "oak_door": "door_wood_lower",
  "redstone_block": "redstone_block",
  "glass": "glass",
  "glowstone": "glowstone",
  "torch": "torch_on",
  "water": "water_still",
  "lava": "lava_still",
  // Add more mappings as needed
};

// Version settings
const versionSettings = {
  "1.19+": {
    packFormat: 12,
    texturesPath: "textures/block",
    getTextureName: (textura) => textura
  },
  "pre-1.19": {
    packFormat: 6,
    texturesPath: "textures/blocks",
    getTextureName: (textura) => legacyTextureMapping[textura] || textura
  }
};

// Add DOM elements references
const texturaSelect = document.getElementById('textura');
const imagemInput = document.getElementById('imagem');
const texturaOriginal = document.getElementById('textura-original');
const texturaSubstituida = document.getElementById('textura-substituida');
const botaoAdicionar = document.getElementById('botao-adicionar');
const botaoDownload = document.getElementById('botao-download');
const listaAlteracoes = document.getElementById('lista-alteracoes');
const versaoSelect = document.getElementById('versao'); // New version selector

// Variables
const texturasSubstituidas = {};
let texturaAtual = null;
let imagemAtual = null;
let versaoAtual = "1.19+"; // Default version

// Initialize version selector
function preencherSelectVersoes() {
  versaoSelect.innerHTML = '';
  
  for (const versao in versionSettings) {
    const option = document.createElement('option');
    option.value = versao;
    option.textContent = versao;
    versaoSelect.appendChild(option);
  }
}

// Fill textures dropdown
function preencherSelectTexturas() {
  texturaSelect.innerHTML = '<option value="">Selecione uma textura</option>';
  
  // Filter textures based on version
  const texturasDisponiveis = versaoAtual === "pre-1.19" 
    ? Object.keys(legacyTextureMapping) 
    : texturasMinecraft;
  
  texturasDisponiveis.forEach(textura => {
    const option = document.createElement('option');
    option.value = textura;
    option.textContent = textura.replace(/_/g, ' ');
    texturaSelect.appendChild(option);
  });
}

// Show original texture
async function mostrarTexturaOriginal(textura) {
  try {
    const settings = versionSettings[versaoAtual];
    const textureName = settings.getTextureName(textura);
    const url = `${settings.texturesPath}/${textureName}.png`;
    
    texturaOriginal.innerHTML = `
      <img src="${url}" alt="Textura Original">
      <p>Nome: ${textura}</p>
      ${versaoAtual === "pre-1.19" ? `<p>Nome legado: ${textureName}</p>` : ''}
    `;
    
    texturaAtual = textura;
  } catch (err) {
    console.error('Erro ao mostrar textura original:', err);
    texturaOriginal.innerHTML = '<p>Erro ao carregar textura</p>';
  }
}

// Show substituted texture
function mostrarTexturaSubstituida(imagem) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const url = event.target.result;
    texturaSubstituida.innerHTML = `<img src="${url}" alt="Textura Substituída">`;
    imagemAtual = imagem;
    botaoAdicionar.disabled = false;
  };
  reader.readAsDataURL(imagem);
}

// Add texture change
function adicionarAlteracao() {
  if (!texturaAtual || !imagemAtual) return;
  
  texturasSubstituidas[texturaAtual] = {
    imagem: imagemAtual,
    versao: versaoAtual
  };

  atualizarListaAlteracoes();
  
  texturaSubstituida.innerHTML = '';
  imagemInput.value = '';
  botaoAdicionar.disabled = true;
}

// Remove texture change
function removerAlteracao(textura) {
  delete texturasSubstituidas[textura];
  atualizarListaAlteracoes();
}

// Update list of changes
function atualizarListaAlteracoes() {
  listaAlteracoes.innerHTML = '';
  Object.keys(texturasSubstituidas).forEach(textura => {
    const item = document.createElement('div');
    item.className = 'alteracao-item';
    const versao = texturasSubstituidas[textura].versao;
    item.innerHTML = `
      <span>${textura.replace(/_/g, ' ')}</span>
      <span class="badge ${versao === "1.19+" ? "badge-new" : "badge-legacy"}">
        ${versao}
      </span>
      <button onclick="removerAlteracao('${textura}')">Remover</button>
    `;
    listaAlteracoes.appendChild(item);
  });
}

// Event listeners
versaoSelect.addEventListener('change', (event) => {
  versaoAtual = event.target.value;
  preencherSelectTexturas();
  texturaOriginal.innerHTML = '';
  texturaSubstituida.innerHTML = '';
  botaoAdicionar.disabled = true;
});

texturaSelect.addEventListener('change', async (event) => {
  const texturaSelecionada = event.target.value;
  if (texturaSelecionada) {
    await mostrarTexturaOriginal(texturaSelecionada);
  } else {
    texturaOriginal.innerHTML = '';
  }
  texturaSubstituida.innerHTML = '';
  botaoAdicionar.disabled = true;
});

imagemInput.addEventListener('change', (event) => {
  const imagemEnviada = event.target.files[0];
  if (imagemEnviada && imagemEnviada.type.startsWith('image/')) {
    mostrarTexturaSubstituida(imagemEnviada);
  } else {
    alert('Por favor, selecione uma imagem válida.');
    texturaSubstituida.innerHTML = '';
    botaoAdicionar.disabled = true;
  }
});

botaoAdicionar.addEventListener('click', adicionarAlteracao);

botaoDownload.addEventListener('click', async () => {
  try {
    const zip = new JSZip();
    
    const versoes = new Set();
    Object.values(texturasSubstituidas).forEach(item => {
      versoes.add(item.versao);
    });
    
    let highestPackFormat = 6;
    versoes.forEach(versao => {
      const packFormat = versionSettings[versao].packFormat;
      if (packFormat > highestPackFormat) {
        highestPackFormat = packFormat;
      }
    });

    const packMcmeta = {
      pack: {
        pack_format: highestPackFormat,
        description: "Pack de texturas personalizado multi-versão"
      }
    };
    zip.file("pack.mcmeta", JSON.stringify(packMcmeta, null, 4));

    const packIconCanvas = document.createElement('canvas');
    packIconCanvas.width = 128;
    packIconCanvas.height = 128;
    const ctx = packIconCanvas.getContext('2d');
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 128, 128);
    const packIconBlob = await new Promise(resolve => packIconCanvas.toBlob(resolve));
    zip.file("pack.png", packIconBlob);


    const assetsFolder = zip.folder("assets");
    const minecraftFolder = assetsFolder.folder("minecraft");

    for (const [textura, dados] of Object.entries(texturasSubstituidas)) {
      const { imagem, versao } = dados;
      const settings = versionSettings[versao];
      

      const texturePath = settings.texturesPath;
      const textureName = settings.getTextureName(textura);
      

      const textureFolder = minecraftFolder.folder(texturePath);

      const blob = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result;
          const byteString = atob(dataUrl.split(',')[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          resolve(new Blob([ab], { type: 'image/png' }));
        };
        reader.readAsDataURL(imagem);
      });
      

      textureFolder.file(`${textureName}.png`, blob);
    }


    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "minecraft_texture_pack.zip");
  } catch (err) {
    console.error('Erro durante o processo de download:', err);
    alert('Erro ao gerar o arquivo de texturas. Por favor, tente novamente.');
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  preencherSelectVersoes();
  preencherSelectTexturas();
});