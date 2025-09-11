<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Overlay -->
      <div
        v-if="isOpenState"
        class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        @click="handleOverlayClick"
      />

      <!-- Customizer Panel -->
      <Transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="isOpenState"
          class="fixed right-0 top-0 z-[9999] h-full w-full sm:w-[420px] bg-background border-l shadow-xl flex flex-col"
        >
          <!-- Header -->
          <div class="flex items-center justify-between border-b p-4 bg-muted/30">
            <div>
              <h2 class="text-lg font-semibold">Theme Customizer</h2>
              <p class="text-sm text-muted-foreground">Personalize your experience</p>
            </div>
            <div class="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                title="Reset to defaults"
                @click="handleReset"
              >
                <Icon name="lucide:rotate-ccw" class="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                title="Close customizer"
                @click="handleClose"
              >
                <Icon name="lucide:x" class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- Accordion Content -->
          <div class="flex-1 overflow-y-auto">
            <Accordion type="multiple" :default-value="['current', 'shadow']" class="px-4">
              <!-- Current Theme Info -->
              <AccordionItem value="current">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:info" class="h-4 w-4" />
                    Current Theme
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-3">
                    <div class="bg-muted/20 p-4 rounded-lg border-l-2 border-primary/20">
                      <div class="grid grid-cols-2 gap-3 text-sm">
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Preset:</span>
                          <span class="font-medium">{{ currentPresetLabel }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Mode:</span>
                          <span class="font-medium capitalize">{{ colorMode.preference }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Primary:</span>
                          <div class="flex items-center gap-2">
                            <span
                              class="h-3 w-3 rounded-full border shadow-sm"
                              :style="{ backgroundColor: theme.getColorValue(currentPrimaryColorValue) }"
                            />
                            <span class="text-xs font-medium capitalize">{{ currentPrimaryColorValue }}</span>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Neutral:</span>
                          <div class="flex items-center gap-2">
                            <span
                              class="h-3 w-3 rounded-full border shadow-sm"
                              :style="{ backgroundColor: theme.getColorValue(currentNeutralColorValue) }"
                            />
                            <span class="text-xs font-medium capitalize">{{ currentNeutralColorValue }}</span>
                          </div>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Radius:</span>
                          <span class="font-medium">{{ radiusDisplay }}rem</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Spacing:</span>
                          <span class="font-medium">{{ spacingDisplay }}×</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Shadow:</span>
                          <span class="font-medium text-xs">{{ shadowDisplay }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Font:</span>
                          <span class="font-medium capitalize">{{ currentFontScaleValue }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                          <span class="text-muted-foreground">Direction:</span>
                          <span class="font-medium uppercase">{{ currentDirectionValue }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Theme Presets -->
              <AccordionItem value="presets">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:palette" class="h-4 w-4" />
                    Theme Presets
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-3">
                    <select 
                      :value="currentPresetValue" 
                      class="w-full p-2 border rounded bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
                      @change="handlePresetChange"
                    >
                      <option 
                        v-for="preset in presetsList"
                        :key="preset.value"
                        :value="preset.value"
                      >
                        {{ preset.label }}
                      </option>
                    </select>

                    <div class="text-xs text-muted-foreground bg-muted/30 p-3 rounded border-l-2 border-primary/20">
                      {{ currentPresetDescription }}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Primary Colors -->
              <AccordionItem value="primary">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:circle-dot" class="h-4 w-4" />
                    Primary Color
                    <span v-if="!isCustomThemeComputed" class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-auto">
                      Preview Only
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-2 gap-2">
                    <Button
                      v-for="color in primaryColorsList"
                      :key="color.value"
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentPrimaryColorValue === color.value,
                        'opacity-60 cursor-not-allowed': !isCustomThemeComputed
                      }"
                      :disabled="!isCustomThemeComputed"
                      @click="handlePrimaryColorClick(color.value)"
                    >
                      <span
                        class="h-4 w-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        :style="{ backgroundColor: theme.getColorValue(color.value) }"
                      />
                      <span class="text-xs font-medium">{{ color.label }}</span>
                      <Icon
                        v-if="currentPrimaryColorValue === color.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                  <div v-if="!isCustomThemeComputed" class="text-xs text-muted-foreground mt-2 p-2 bg-muted/20 rounded">
                    Primary colors are locked for this preset. Switch to "Default" preset to customize.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Neutral Colors -->
              <AccordionItem value="neutral">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:layers" class="h-4 w-4" />
                    Neutral Theme
                    <span v-if="!isCustomThemeComputed" class="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-auto">
                      Preview Only
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-1 gap-2">
                    <Button
                      v-for="color in neutralColorsList"
                      :key="color.value"
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentNeutralColorValue === color.value,
                        'opacity-60 cursor-not-allowed': !isCustomThemeComputed
                      }"
                      :disabled="!isCustomThemeComputed"
                      @click="handleNeutralColorClick(color.value)"
                    >
                      <span
                        class="h-4 w-4 rounded-full border-2 border-white shadow-sm flex-shrink-0"
                        :style="{ backgroundColor: theme.getColorValue(color.value) }"
                      />
                      <span class="text-xs font-medium">{{ color.label }}</span>
                      <Icon
                        v-if="currentNeutralColorValue === color.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                  <div v-if="!isCustomThemeComputed" class="text-xs text-muted-foreground mt-2 p-2 bg-muted/20 rounded">
                    Neutral colors are locked for this preset. Switch to "Default" preset to customize.
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Border Radius -->
              <AccordionItem value="radius">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:corner-down-right" class="h-4 w-4" />
                    Border Radius
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-4">
                    <div class="space-y-4 pt-2">
                      <Slider
                        :model-value="[currentRadiusValue]"
                        :max="2"
                        :min="0"
                        :step="0.1"
                        class="w-full"
                        @update:model-value="handleRadiusChange"
                      />
                      <div class="flex items-center gap-2">
                        <div class="flex justify-between text-xs text-muted-foreground flex-1">
                          <span>0 (Sharp)</span>
                          <span>2 (Rounded)</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <input
                            :value="currentRadiusValue.toFixed(1)"
                            type="number"
                            min="0"
                            max="2"
                            step="0.1"
                            class="w-16 px-2 py-1 text-xs border rounded bg-background"
                            @input="handleRadiusInput"
                          >
                          <span class="text-xs text-muted-foreground">rem</span>
                        </div>
                      </div>
                    </div>
                    <!-- Preview -->
                    <div class="flex gap-3 justify-center p-4 bg-muted/30 rounded">
                      <div
                        class="w-8 h-8 bg-primary border shadow-sm"
                        :style="{ borderRadius: `${currentRadiusValue}rem` }"
                      />
                      <div
                        class="w-8 h-8 bg-secondary border shadow-sm"
                        :style="{ borderRadius: `${currentRadiusValue}rem` }"
                      />
                      <div
                        class="w-8 h-8 bg-muted-foreground border shadow-sm"
                        :style="{ borderRadius: `${currentRadiusValue}rem` }"
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Spacing Scale -->
              <AccordionItem value="spacing">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:square-dashed" class="h-4 w-4" />
                    Spacing Scale
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-4">
                    <div class="space-y-4 pt-2">
                      <Slider
                        :model-value="[currentSpacingValue]"
                        :max="3"
                        :min="0.5"
                        :step="0.1"
                        class="w-full"
                        @update:model-value="handleSpacingChange"
                      />
                      <div class="flex items-center gap-2">
                        <div class="flex justify-between text-xs text-muted-foreground flex-1">
                          <span>0.5 (Compact)</span>
                          <span>3 (Spacious)</span>
                        </div>
                        <div class="flex items-center gap-2">
                          <input
                            :value="currentSpacingValue.toFixed(1)"
                            type="number"
                            min="0.5"
                            max="3"
                            step="0.1"
                            class="w-16 px-2 py-1 text-xs border rounded bg-background"
                            @input="handleSpacingInput"
                          >
                          <span class="text-xs text-muted-foreground">×</span>
                        </div>
                      </div>
                    </div>
                    <!-- Preview -->
                    <div class="p-4 bg-muted/30 rounded">
                      <div class="text-xs text-muted-foreground mb-2">Spacing Preview:</div>
                      <div 
                        class="flex items-center"
                        :style="{ gap: `${currentSpacingValue * 0.5}rem` }"
                      >
                        <div 
                          class="bg-primary rounded"
                          :style="{ 
                            width: `${currentSpacingValue * 1}rem`, 
                            height: `${currentSpacingValue * 1}rem`,
                            padding: `${currentSpacingValue * 0.25}rem`
                          }"
                        />
                        <div 
                          class="bg-secondary rounded"
                          :style="{ 
                            width: `${currentSpacingValue * 1}rem`, 
                            height: `${currentSpacingValue * 1}rem`,
                            padding: `${currentSpacingValue * 0.25}rem`
                          }"
                        />
                        <div 
                          class="bg-muted-foreground rounded"
                          :style="{ 
                            width: `${currentSpacingValue * 1}rem`, 
                            height: `${currentSpacingValue * 1}rem`,
                            padding: `${currentSpacingValue * 0.25}rem`
                          }"
                        />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- IMPROVED: Shadow Style Section -->
              <AccordionItem value="shadow">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:box" class="h-4 w-4" />
                    Shadow Style                   
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="space-y-6">
                    <!-- Shadow Color (single picker) -->
                    <div class="space-y-3">
                      <label class="text-sm font-medium text-foreground">Shadow Color</label>
                      <div class="flex items-center gap-3">
                        <input
                          :value="currentShadowConfig.customColor"
                          type="color"
                          class="h-9 w-9 p-0 rounded border cursor-pointer"
                          title="Pick shadow color"
                          @input="handleShadowCustomColorInput"
                        >
                        <input
                          :value="currentShadowConfig.customColor"
                          type="text"
                          spellcheck="false"
                          class="w-28 px-2 py-1 text-xs font-mono border rounded bg-background"
                          placeholder="#000000"
                          @input="handleShadowCustomHexInput"
                        >
                        <Button
                          variant="outline"
                          size="sm"
                          class="h-9 text-xs"
                          title="Reset color"
                          @click="handleShadowCustomColorReset"
                        >Reset</Button>
                      </div>
                      <p class="text-[10px] text-muted-foreground uppercase tracking-wide">Format: #RGB or #RRGGBB</p>
                    </div>

                    <!-- Shadow Controls Grid -->
                    <div class="grid grid-cols-1 gap-6">
                      <!-- Shadow Opacity -->
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <label class="text-sm font-medium text-foreground">Opacity</label>
                          <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ currentShadowConfig.opacity }}%</span>
                        </div>
                        <div class="flex items-center gap-3">
                          <Slider
                            :model-value="[currentShadowConfig.opacity]"
                            :max="100"
                            :min="0"
                            :step="1"
                            class="flex-1"
                            @update:model-value="handleShadowOpacityChange"
                          />
                          <input
                            :value="currentShadowConfig.opacity"
                            type="number"
                            min="0"
                            max="100"
                            class="w-16 px-2 py-1 text-xs border rounded bg-background text-center focus:ring-1 focus:ring-primary"
                            @input="handleShadowOpacityInput"
                          >
                        </div>
                      </div>

                      <!-- Blur Radius -->
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <label class="text-sm font-medium text-foreground">Blur Radius</label>
                          <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ currentShadowConfig.blurRadius }}px</span>
                        </div>
                        <div class="flex items-center gap-3">
                          <Slider
                            :model-value="[currentShadowConfig.blurRadius]"
                            :max="50"
                            :min="0"
                            :step="1"
                            class="flex-1"
                            @update:model-value="handleShadowBlurRadiusChange"
                          />
                          <input
                            :value="currentShadowConfig.blurRadius"
                            type="number"
                            min="0"
                            max="50"
                            class="w-16 px-2 py-1 text-xs border rounded bg-background text-center focus:ring-1 focus:ring-primary"
                            @input="handleShadowBlurRadiusInput"
                          >
                        </div>
                      </div>

                      <!-- Spread -->
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <label class="text-sm font-medium text-foreground">Spread</label>
                          <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ currentShadowConfig.spread }}px</span>
                        </div>
                        <div class="flex items-center gap-3">
                          <Slider
                            :model-value="[currentShadowConfig.spread]"
                            :max="25"
                            :min="-25"
                            :step="1"
                            class="flex-1"
                            @update:model-value="handleShadowSpreadChange"
                          />
                          <input
                            :value="currentShadowConfig.spread"
                            type="number"
                            min="-25"
                            max="25"
                            class="w-16 px-2 py-1 text-xs border rounded bg-background text-center focus:ring-1 focus:ring-primary"
                            @input="handleShadowSpreadInput"
                          >
                        </div>
                      </div>

                      <!-- Offset X & Y in same row -->
                      <div class="grid grid-cols-2 gap-4">
                        <!-- Offset X -->
                        <div class="space-y-3">
                          <div class="flex items-center justify-between">
                            <label class="text-sm font-medium text-foreground">Offset X</label>
                            <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ currentShadowConfig.offsetX }}px</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <Slider
                              :model-value="[currentShadowConfig.offsetX]"
                              :max="25"
                              :min="-25"
                              :step="1"
                              class="flex-1"
                              @update:model-value="handleShadowOffsetXChange"
                            />
                            <input
                              :value="currentShadowConfig.offsetX"
                              type="number"
                              min="-25"
                              max="25"
                              class="w-14 px-1 py-1 text-xs border rounded bg-background text-center focus:ring-1 focus:ring-primary"
                              @input="handleShadowOffsetXInput"
                            >
                          </div>
                        </div>

                        <!-- Offset Y -->
                        <div class="space-y-3">
                          <div class="flex items-center justify-between">
                            <label class="text-sm font-medium text-foreground">Offset Y</label>
                            <span class="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">{{ currentShadowConfig.offsetY }}px</span>
                          </div>
                          <div class="flex items-center gap-2">
                            <Slider
                              :model-value="[currentShadowConfig.offsetY]"
                              :max="25"
                              :min="-25"
                              :step="1"
                              class="flex-1"
                              @update:model-value="handleShadowOffsetYChange"
                            />
                            <input
                              :value="currentShadowConfig.offsetY"
                              type="number"
                              min="-25"
                              max="25"
                              class="w-14 px-1 py-1 text-xs border rounded bg-background text-center focus:ring-1 focus:ring-primary"
                              @input="handleShadowOffsetYInput"
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- IMPROVED: Enhanced Shadow Preview Section -->
                    <div class="space-y-4 p-4 bg-muted/20 rounded-lg border">
                      <div class="flex items-center justify-between">
                        <div class="text-sm font-medium text-foreground">Shadow Preview</div>
                        <Button
                          variant="outline"
                          size="sm"
                          class="h-7 px-2 text-xs"
                          @click="theme.forceShadowUpdate()"
                        >
                          <Icon name="lucide:refresh-cw" class="h-3 w-3 mr-1" />
                          Force Update
                        </Button>
                      </div>

                      <!-- Live Preview Elements -->
                      <div class="flex gap-4 justify-center items-center p-6 bg-background/50 rounded border-dashed border-2">
                        <div
                          key="preview-1"
                          class="w-16 h-16 bg-card border rounded transition-all duration-300 flex items-center justify-center"
                          :style="{ 
                            boxShadow: computedShadowCSS,
                            borderRadius: `${currentRadiusValue * 0.5}rem`
                          }"
                        >
                          <Icon name="lucide:square" class="h-6 w-6 text-muted-foreground" />
                        </div>
                        
                        <div
                          key="preview-2"
                          class="w-12 h-12 bg-primary/20 border rounded-full transition-all duration-300 flex items-center justify-center"
                          :style="{ boxShadow: computedShadowCSS }"
                        >
                          <Icon name="lucide:circle" class="h-4 w-4 text-primary" />
                        </div>
                        
                        <div
                          key="preview-3"
                          class="w-20 h-10 bg-secondary/30 border rounded transition-all duration-300 flex items-center justify-center"
                          :style="{ 
                            boxShadow: computedShadowCSS,
                            borderRadius: `${currentRadiusValue}rem`
                          }"
                        >
                          <span class="text-xs font-medium text-secondary-foreground">Button</span>
                        </div>
                      </div>

                      <!-- CSS Output Display -->
                      <div class="space-y-2">
                        <div class="text-xs font-medium text-muted-foreground">Generated CSS:</div>
                        <div class="p-3 bg-muted/50 rounded border text-xs font-mono text-muted-foreground break-all select-all">
                          box-shadow: {{ computedShadowCSS }};
                        </div>
                      </div>

                      <!-- Test Element using CSS Variable -->
                      <div class="text-center">
                        <div class="inline-flex items-center gap-2 px-4 py-2 bg-card rounded border shadow-custom text-sm font-medium">
                          <Icon name="lucide:sparkles" class="h-4 w-4" />
                          Using .shadow-custom class
                        </div>
                      </div>

                      <!-- Quick Presets -->
                      <div class="space-y-2">
                        <div class="text-xs font-medium text-muted-foreground">Quick Presets:</div>
                        <div class="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            class="h-8 text-xs"
                            @click="handleShadowPreset('none')"
                          >
                            None
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            class="h-8 text-xs"
                            @click="handleShadowPreset('subtle')"
                          >
                            Subtle
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            class="h-8 text-xs"
                            @click="handleShadowPreset('medium')"
                          >
                            Medium
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            class="h-8 text-xs"
                            @click="handleShadowPreset('strong')"
                          >
                            Strong
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Font Size -->
              <AccordionItem value="font">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:type" class="h-4 w-4" />
                    Font Size
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-2 gap-2">
                    <Button
                      v-for="font in fontOptionsList"
                      :key="font.value"
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentFontScaleValue === font.value
                      }"
                      @click="handleFontScaleClick(font.value)"
                    >
                      <Icon name="lucide:type" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-xs font-medium">{{ font.label }}</span>
                      <Icon
                        v-if="currentFontScaleValue === font.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Color Mode -->
              <AccordionItem value="mode">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:monitor" class="h-4 w-4" />
                    Color Mode
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-1 gap-2">
                    <Button
                      v-for="mode in modeOptionsList"
                      :key="mode.value"
                      variant="outline"
                      class="flex items-center gap-3 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': colorMode.preference === mode.value
                      }"
                      @click="handleColorModeClick(mode.value)"
                    >
                      <Icon :name="mode.icon" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-sm font-medium">{{ mode.label }}</span>
                      <Icon
                        v-if="colorMode.preference === mode.value"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <!-- Text Direction -->
              <AccordionItem value="direction">
                <AccordionTrigger class="py-4">
                  <div class="flex items-center gap-2">
                    <Icon name="lucide:move-horizontal" class="h-4 w-4" />
                    Text Direction
                  </div>
                </AccordionTrigger>
                <AccordionContent class="pb-4">
                  <div class="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentDirectionValue === 'ltr'
                      }"
                      @click="handleDirectionClick('ltr')"
                    >
                      <Icon name="lucide:align-left" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-xs font-medium">LTR</span>
                      <Icon
                        v-if="currentDirectionValue === 'ltr'"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                    <Button
                      variant="outline"
                      class="flex items-center gap-2 h-auto p-3 justify-start transition-all hover:scale-105"
                      :class="{
                        'border-primary border-2 bg-primary/10 shadow-sm': currentDirectionValue === 'rtl'
                      }"
                      @click="handleDirectionClick('rtl')"
                    >
                      <Icon name="lucide:align-right" class="h-4 w-4 flex-shrink-0" />
                      <span class="text-xs font-medium">RTL</span>
                      <Icon
                        v-if="currentDirectionValue === 'rtl'"
                        name="lucide:check"
                        class="h-3 w-3 ml-auto text-primary"
                      />
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { toast } from 'vue-sonner'

const theme = useTheme()
const colorMode = useColorMode()

// Create local reactive state for UI
const isOpenState = ref(false)

// Computed to unwrap theme values
const isOpenValue = computed(() => unref(theme.isOpen))
const currentPresetValue = computed(() => unref(theme.currentPreset))
const currentPrimaryColorValue = computed(() => unref(theme.currentPrimaryColor))
const currentNeutralColorValue = computed(() => unref(theme.currentNeutralColor))
const currentRadiusValue = computed(() => {
  const value = unref(theme.currentRadius)
  return typeof value === 'number' && !isNaN(value) ? value : 0.5
})
const currentFontScaleValue = computed(() => unref(theme.fontScale))
const currentDirectionValue = computed(() => unref(theme.direction))
const currentSpacingValue = computed(() => {
  const value = unref(theme.spacing)
  return typeof value === 'number' && !isNaN(value) ? value : 1
})
const currentShadowConfig = computed(() => unref(theme.shadowConfig))
const isCustomThemeComputed = computed(() => unref(theme.isCustomTheme))

// IMPROVED: Properly computed shadow CSS with reactivity and debugging
const computedShadowCSS = computed(() => {
  const shadowCSS = unref(theme.computedShadowCSS)
  console.log('[customizer] Shadow CSS updated:', shadowCSS)
  return shadowCSS || '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
})

// Convert computed arrays to reactive arrays with safety checks
const presetsList = computed(() => {
  const presets = theme.presets.value
  return Array.isArray(presets) ? presets : []
})

const primaryColorsList = computed(() => {
  const colors = theme.primaryColors.value
  return Array.isArray(colors) ? colors : []
})

const neutralColorsList = computed(() => {
  const colors = theme.neutralColors.value
  return Array.isArray(colors) ? colors : []
})

const modeOptionsList = computed(() => {
  const modes = theme.modeOptions.value
  return Array.isArray(modes) ? modes : []
})

const fontOptionsList = computed(() => {
  const fonts = theme.fontOptions.value
  return Array.isArray(fonts) ? fonts : []
})

// Display computed values
const radiusDisplay = computed(() => currentRadiusValue.value.toFixed(1))
const spacingDisplay = computed(() => currentSpacingValue.value.toFixed(1))
const shadowDisplay = computed(() => {
  const config = currentShadowConfig.value
  if (!config) return 'None'
  
  const offsetX = config.offsetX
  const offsetY = config.offsetY
  const blur = config.blurRadius
  const spread = config.spread
  const opacity = config.opacity
  
  if (offsetX === 0 && offsetY === 0 && blur === 0 && spread === 0) {
    return 'None'
  }
  
  return `${offsetX}/${offsetY}/${blur}/${spread} (${opacity}%)`
})

const currentPresetLabel = computed(() => {
  const searchValue = currentPresetValue.value
  const availablePresets = presetsList.value
  
  if (availablePresets.length === 0) return 'Loading...'
  
  const foundPreset = availablePresets.find(p => p.value === searchValue)
  return foundPreset?.label || `Unknown (${searchValue})`
})

const currentPresetDescription = computed(() => {
  const preset = presetsList.value.find(p => p.value === currentPresetValue.value)
  return preset?.description || 'No description available for this preset.'
})

// Sync local state with theme state
watch(isOpenValue, (newValue) => {
  isOpenState.value = newValue
}, { immediate: true })

watch(() => theme.isOpen, (newValue) => {
  if (newValue && typeof newValue === 'object' && 'value' in newValue) {
    isOpenState.value = newValue.value
  } else {
    isOpenState.value = !!newValue
  }
}, { immediate: true })

// IMPROVED: Watch shadow changes for debugging
watch(currentShadowConfig, (newConfig) => {
  console.log('[customizer] Shadow config changed:', newConfig)
}, { deep: true })

watch(computedShadowCSS, (newCSS) => {
  console.log('[customizer] Computed shadow CSS changed:', newCSS)
})

// Event handlers
const handleClose = () => {
  theme.closeCustomizer()
}

const handleOverlayClick = () => {
  theme.closeCustomizer()
}

const handleReset = () => {
  toast('Are you sure you want to reset all theme settings to defaults?', {
    position: 'top-center',
    duration: 6000,
    action: {
      label: 'Reset',
      onClick: () => {
        theme.resetToDefaults()
        toast.success('Theme settings have been reset to defaults', {
          position: 'top-center',
          duration: 3000
        })
      }
    },
    cancel: {
      label: 'Cancel',
      onClick: () => {
        toast.info('Reset cancelled', {
          position: 'top-center',
          duration: 2000
        })
      }
    }
  })
}

// Basic handlers
const handlePresetChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  theme.setPreset(target.value as any)
}

const handlePrimaryColorClick = (value: string) => {
  if (isCustomThemeComputed.value) {
    theme.setPrimaryColor(value)
  }
}

const handleNeutralColorClick = (value: string) => {
  if (isCustomThemeComputed.value) {
    theme.setNeutralColor(value)
  }
}

const handleFontScaleClick = (value: string) => {
  theme.setFontScale(value as any)
}

const handleColorModeClick = (value: string) => {
  theme.setColorMode(value)
}

const handleDirectionClick = (value: string) => {
  theme.setDirection(value as any)
}

// Radius handlers
const handleRadiusChange = (value: number[]) => {
  theme.setRadius(value[0])
}

const handleRadiusInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  if (!isNaN(value)) {
    theme.setRadius(value)
  }
}

// Spacing handlers
const handleSpacingChange = (value: number[]) => {
  theme.setSpacing(value[0])
}

const handleSpacingInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseFloat(target.value)
  if (!isNaN(value)) {
    theme.setSpacing(value)
  }
}

// IMPROVED: Shadow handlers with comprehensive debugging
const handleShadowCustomColorInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = target.value
  console.log('[customizer] Setting custom color:', value)
  theme.setShadowColorType('custom')
  theme.setShadowCustomColor(value)
}

// New: manual hex input handler
const handleShadowCustomHexInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = target.value.trim()
  if (!value.startsWith('#')) value = '#' + value
  const valid = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
  if (valid) {
    theme.setShadowColorType('custom')
    theme.setShadowCustomColor(value)
  }
}

// New: reset shadow color
const handleShadowCustomColorReset = () => {
  const fallback = '#000000'
  theme.setShadowColorType('custom')
  theme.setShadowCustomColor(fallback)
}

const handleShadowOpacityChange = (value: number[]) => {
  console.log('[customizer] Setting opacity:', value[0])
  theme.setShadowOpacity(value[0])
}

const handleShadowOpacityInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  if (!isNaN(value)) {
    console.log('[customizer] Setting opacity via input:', value)
    theme.setShadowOpacity(value)
  }
}

const handleShadowBlurRadiusChange = (value: number[]) => {
  console.log('[customizer] Setting blur radius:', value[0])
  theme.setShadowBlurRadius(value[0])
}

const handleShadowBlurRadiusInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  if (!isNaN(value)) {
    theme.setShadowBlurRadius(value)
  }
}

const handleShadowSpreadChange = (value: number[]) => {
  theme.setShadowSpread(value[0])
}

const handleShadowSpreadInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  if (!isNaN(value)) {
    theme.setShadowSpread(value)
  }
}

const handleShadowOffsetXChange = (value: number[]) => {
  theme.setShadowOffsetX(value[0])
}

const handleShadowOffsetXInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  if (!isNaN(value)) {
    theme.setShadowOffsetX(value)
  }
}

const handleShadowOffsetYChange = (value: number[]) => {
  theme.setShadowOffsetY(value[0])
}

const handleShadowOffsetYInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const value = parseInt(target.value)
  if (!isNaN(value)) {
    theme.setShadowOffsetY(value)
  }
}

// IMPROVED: Shadow preset handlers for quick setup
const handleShadowPreset = (preset: string) => {
  console.log('[customizer] Applying shadow preset:', preset)
  
  switch (preset) {
    case 'none':
      theme.setShadowOpacity(0)
      theme.setShadowBlurRadius(0)
      theme.setShadowSpread(0)
      theme.setShadowOffsetX(0)
      theme.setShadowOffsetY(0)
      break
    case 'subtle':
      theme.setShadowOpacity(10)
      theme.setShadowBlurRadius(6)
      theme.setShadowSpread(0)
      theme.setShadowOffsetX(0)
      theme.setShadowOffsetY(1)
      break
    case 'medium':
      theme.setShadowOpacity(25)
      theme.setShadowBlurRadius(15)
      theme.setShadowSpread(0)
      theme.setShadowOffsetX(0)
      theme.setShadowOffsetY(4)
      break
    case 'strong':
      theme.setShadowOpacity(40)
      theme.setShadowBlurRadius(25)
      theme.setShadowSpread(0)
      theme.setShadowOffsetX(0)
      theme.setShadowOffsetY(8)
      break
  }
  
  toast.success(`Applied ${preset} shadow preset`, {
    position: 'top-center',
    duration: 2000
  })
}

// Keyboard handler for ESC key
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpenState.value) {
    handleClose()
  }
}

onMounted(() => {
  if (import.meta.client) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    document.removeEventListener('keydown', handleKeydown)
  }
})
</script>
