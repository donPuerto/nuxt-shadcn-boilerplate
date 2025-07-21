<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const { 
  consentState, 
  categories, 
  acceptAll, 
  acceptNecessary, 
  updateCategory, 
  savePreferences 
} = useCookieConsent()

const showPreferences = ref(false)
const appConfig = useAppConfig()

// Get cookie policy URL from config
const cookiePolicyUrl = computed(() => 
  appConfig?.footer?.navigation?.find((section: any) => 
    section.links?.some((link: any) => link.key === 'cookie-policy')
  )?.links?.find((link: any) => link.key === 'cookie-policy')?.to || '/cookie-policy'
)

const privacyPolicyUrl = computed(() => 
  appConfig?.footer?.navigation?.find((section: any) => 
    section.links?.some((link: any) => link.key === 'privacy-policy')
  )?.links?.find((link: any) => link.key === 'privacy-policy')?.to || '/privacy'
)
</script>

<template>
  <!-- Cookie Banner -->
  <Teleport to="body">
    <div
      v-if="consentState.showBanner"
      class="fixed inset-x-0 bottom-0 z-50 p-4 md:p-6"
    >
      <Card class="mx-auto max-w-4xl border-border bg-background shadow-lg backdrop-blur-sm">
        <CardContent class="p-6">
          <div class="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div class="flex-1 space-y-2">
              <h3 class="text-lg font-semibold">Cookie Preferences</h3>
              <p class="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, analyze our traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies.
              </p>
              <div class="flex flex-wrap gap-2 text-xs">
                <NuxtLink 
                  :to="cookiePolicyUrl" 
                  class="text-primary hover:underline"
                >
                  Cookie Policy
                </NuxtLink>
                <span class="text-muted-foreground">•</span>
                <NuxtLink 
                  :to="privacyPolicyUrl" 
                  class="text-primary hover:underline"
                >
                  Privacy Policy
                </NuxtLink>
              </div>
            </div>
            
            <div class="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
              <Button 
                variant="outline" 
                size="sm" 
                @click="acceptNecessary"
              >
                Necessary Only
              </Button>
              
              <Dialog v-model:open="showPreferences">
                <DialogTrigger as-child>
                  <Button variant="outline" size="sm">
                    Customize
                  </Button>
                </DialogTrigger>
                
                <DialogContent class="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Cookie Preferences</DialogTitle>
                    <DialogDescription>
                      Choose which cookies you want to accept. You can change these settings at any time.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div class="space-y-4 py-4">
                    <div 
                      v-for="category in categories" 
                      :key="category.id"
                      class="space-y-2"
                    >
                      <div class="flex items-center justify-between">
                        <div class="space-y-1">
                          <Label 
                            :for="category.id" 
                            class="text-sm font-medium"
                          >
                            {{ category.name }}
                            <span 
                              v-if="category.required" 
                              class="text-xs text-muted-foreground"
                            >
                              (Required)
                            </span>
                          </Label>
                          <p class="text-xs text-muted-foreground">
                            {{ category.description }}
                          </p>
                        </div>
                        <Switch
                          :id="category.id"
                          :checked="category.enabled"
                          :disabled="category.required"
                          @update:checked="(checked) => updateCategory(category.id, checked)"
                        />
                      </div>
                      <Separator v-if="category.id !== categories[categories.length - 1].id" />
                    </div>
                  </div>
                  
                  <div class="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      @click="showPreferences = false"
                    >
                      Cancel
                    </Button>
                    <Button @click="savePreferences(); showPreferences = false">
                      Save Preferences
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              
              <Button @click="acceptAll">
                Accept All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </Teleport>
</template>